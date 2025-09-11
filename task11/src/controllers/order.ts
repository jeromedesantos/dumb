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
      order = "desc",
      offset = 0,
      limit = 10,
    } = req.query;
    const orders = await prisma.order.findMany({
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
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

export async function searchOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      id,
      sortBy = "createdAt",
      order = "desc",
      offset = 0,
      limit = 10,
    } = req.query;
    if (!id || typeof id !== "string") {
      throw appError(
        "Order id must be a string and is required for search!",
        400
      );
    }
    const orders = await prisma.order.findMany({
      where: {
        deletedAt: null,
        id: {
          contains: id,
          mode: "insensitive",
        },
      },
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      skip: Number(offset),
      take: Number(limit),
    });
    if (orders.length === 0) {
      throw appError("Order not found!", 400);
    }
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
      include: {
        product: {
          select: {
            name: true,
            price: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      where: {
        id,
        deletedAt: null,
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
    const [user, product] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId, deletedAt: null },
      }),
      prisma.product.findUnique({
        where: { id: productId, deletedAt: null },
      }),
    ]);
    if (user === null) {
      throw appError("User not Found", 404);
    }
    if (product === null) {
      throw appError("Product not Found", 404);
    }
    if (product && product.stock < qty) {
      throw appError("Insufficient stock!", 400);
    }
    const total = (product.price as any) * qty;
    const createdOrder = await prisma.$transaction(async (tx) => {
      try {
        await tx.product.update({
          where: { id: productId, deletedAt: null },
          data: { stock: { decrement: qty } },
        });
        if (total >= 10000) {
          await tx.user.update({
            where: { id: userId, deletedAt: null },
            data: { point: { increment: 10 } },
          });
        }
        return await tx.order.create({
          data: {
            id: generateKey("ord"),
            userId,
            productId,
            qty,
            total,
          },
        });
      } catch (err: any) {
        throw appError(err.message, 500);
      }
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
    const { id } = req.params;
    const { qty } = req.body;
    const oldOrder = await prisma.order.findUnique({
      where: { id, deletedAt: null },
    });
    if (oldOrder === null) {
      throw appError("Old order not Found", 404);
    }
    const [user, product] = await Promise.all([
      prisma.user.findUnique({
        where: { id: oldOrder.userId, deletedAt: null },
      }),
      prisma.product.findUnique({
        where: { id: oldOrder.productId, deletedAt: null },
      }),
    ]);
    if (user === null) {
      throw appError("User not Found", 404);
    }
    if (product === null) {
      throw appError("Product not Found", 404);
    }
    const diffQty = qty - oldOrder.qty;
    const total = (product.price as any) * qty;
    const oldEligible = (oldOrder.total as any) >= 10000;
    const newEligible = total >= 10000;
    const updatedOrder = await prisma.$transaction(async (tx) => {
      try {
        if (diffQty > 0 && product.stock < diffQty) {
          throw appError("Insufficient stock!", 400);
        }
        if (diffQty > 0) {
          await tx.product.update({
            where: { id: oldOrder.productId, deletedAt: null },
            data: {
              stock: {
                decrement: diffQty,
              },
            },
          });
        } else if (diffQty < 0) {
          await tx.product.update({
            where: { id: oldOrder.productId, deletedAt: null },
            data: {
              stock: {
                increment: Math.abs(diffQty),
              },
            },
          });
        }
        if (!oldEligible && newEligible) {
          await tx.user.update({
            where: { id: oldOrder.userId, deletedAt: null },
            data: { point: { increment: 10 } },
          });
        } else if (
          oldEligible &&
          !newEligible &&
          user?.point &&
          user.point > 0
        ) {
          await tx.user.update({
            where: { id: oldOrder.userId, deletedAt: null },
            data: { point: { decrement: 10 } },
          });
        }
        return await tx.order.update({
          where: { id, deletedAt: null },
          data: {
            qty,
            total,
            updatedAt: new Date(),
          },
        });
      } catch (err: any) {
        throw appError(err.message, 500);
      }
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
        deletedAt: { not: null },
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
      where: { id, deletedAt: null },
    });
    if (oldOrder === null) {
      throw appError("Old order not Found", 404);
    }
    const [user, product] = await Promise.all([
      prisma.user.findUnique({
        where: { id: oldOrder.userId, deletedAt: null },
      }),
      prisma.product.findUnique({
        where: { id: oldOrder.productId, deletedAt: null },
      }),
    ]);
    if (user === null) {
      throw appError("User not Found", 404);
    }
    if (product === null) {
      throw appError("Product not Found", 404);
    }
    const deletedOrder = await prisma.$transaction(async (tx) => {
      try {
        if ((oldOrder.total as any) >= 10000 && user?.point && user.point > 0) {
          await tx.user.update({
            where: { id: oldOrder.userId, deletedAt: null },
            data: { point: { decrement: 10 } },
          });
        }
        await tx.product.update({
          where: { id: oldOrder.productId, deletedAt: null },
          data: { stock: { increment: oldOrder.qty } },
        });
        return await tx.order.update({
          where: { id, deletedAt: null },
          data: {
            qty: 0,
            total: 0,
            deletedAt: new Date(),
          },
        });
      } catch (err: any) {
        throw appError(err.message, 500);
      }
    });
    res.status(200).json({
      status: "Success",
      message: `Delete order [${deletedOrder.id}] success!`,
    });
  } catch (err) {
    next(err);
  }
}
