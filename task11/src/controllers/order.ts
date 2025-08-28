import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
import { generateKey } from "../utils/nanoid";
import { appError } from "../utils/error";

export async function readOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      sortBy = "createdAt",
      order = "asc",
      offset = 0,
      limit = 10,
    } = req.query;
    const orders = await prisma.order.findMany({
      include: {
        product: true,
        user: true,
      },
      where: {
        deletedAt: null,
      },
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });
    res.status(200).json({
      status: "Success",
      message: "Fetch orders success!",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
}

export async function readOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const order = await prisma.order.findUnique({
      where: {
        id,
        deletedAt: null,
      },
      include: {
        product: true,
        user: true,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Fetch order success!",
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, productId, qty } = req.body;
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (product === null) {
      throw appError("Product not Found", 404);
    }
    if (product && product.stock < qty) {
      throw appError("Insufficient stock!", 400);
    }
    const total = (product.price as any) * qty;
    const createdOrder = await prisma.$transaction(async (tx) => {
      if (total > 10000) {
        await tx.user.update({
          where: { id: userId },
          data: { point: { increment: 10 } },
        });
      }
      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: qty } },
      });
      return await tx.order.create({
        data: {
          id: generateKey("ord"),
          userId,
          productId,
          qty,
          total,
        },
      });
    });
    res.status(201).json({
      status: "Success",
      message: `Create order [${createdOrder.id}] success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const { qty } = req.body;
    const oldOrder = await prisma.order.findUnique({
      where: { id },
    });
    if (oldOrder === null) {
      throw appError("Old order not Found", 404);
    }
    const product = await prisma.product.findUnique({
      where: { id: oldOrder.productId },
    });
    if (product === null) {
      throw appError("Product not Found", 404);
    }
    const diff = qty - oldOrder.qty;
    if (product.stock < diff) {
      throw appError("Insufficient stock!", 400);
    }
    const total = (product.price as any) * qty;
    const updatedOrder = await prisma.$transaction(async (tx) => {
      if (diff > 0) {
        await tx.product.update({
          where: { id: oldOrder.productId },
          data: {
            stock: {
              decrement: diff,
            },
          },
        });
      } else if (diff < 0) {
        await tx.product.update({
          where: { id: oldOrder.productId },
          data: {
            stock: {
              increment: Math.abs(diff),
            },
          },
        });
      }
      if ((oldOrder.total as any) > 10000) {
        await tx.user.update({
          where: { id: oldOrder.userId },
          data: { point: { decrement: 10 } },
        });
      }
      if (total > 10000) {
        await tx.user.update({
          where: { id: oldOrder.userId },
          data: { point: { increment: 10 } },
        });
      }
      return await tx.order.update({
        where: { id },
        data: {
          qty,
          total,
          updatedAt: new Date(),
        },
      });
    });
    res.status(200).json({
      status: "Success",
      message: `Update order [${updatedOrder.id}] success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function restoreOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const restoredOrder = await prisma.product.update({
      data: {
        deletedAt: null,
      },
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "Success",
      message: `Restore order [${restoredOrder.id}] success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const oldOrder = await prisma.order.findUnique({
      where: { id },
    });
    if (oldOrder === null) {
      throw appError("Old order not Found", 404);
    }
    const product = await prisma.product.findUnique({
      where: { id: oldOrder.productId },
    });
    if (product === null) {
      throw appError("Product not Found", 404);
    }
    const deletedOrder = await prisma.$transaction(async (tx) => {
      if ((oldOrder.total as any) > 10000) {
        await tx.user.update({
          where: { id: oldOrder.userId },
          data: { point: { decrement: 10 } },
        });
      }
      await tx.product.update({
        where: { id: oldOrder.productId },
        data: { stock: { increment: oldOrder.qty } },
      });
      return await tx.order.update({
        where: { id },
        data: {
          qty: 0,
          total: 0,
          deletedAt: new Date(),
        },
      });
    });
    res.status(200).json({
      status: "200 OK",
      message: `Delete order [${deletedOrder.id}] success!`,
    });
  } catch (err) {
    next(err);
  }
}
