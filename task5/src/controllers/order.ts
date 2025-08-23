import { Request, Response } from "express";
import { prisma } from "../connections/client";

export async function readOrders(req: Request, res: Response) {
  try {
    const { sortBy, order, limit, offset } = req.query;
    const rawOrders = await prisma.order.findMany({
      include: {
        product: true,
        user: true,
      },
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch orders success!",
      orders: rawOrders.map(({ userId, productId, ...rest }) => rest),
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch orders!",
    });
  }
}

export async function readOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const rawOrder = await prisma.order.findUnique({
      where: { id },
      include: {
        product: true,
        user: true,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch order success!",
      order: rawOrder
        ? (({ userId, productId, ...rest }) => rest)(rawOrder)
        : null,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch order!",
    });
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { userId, productId, quantity } = req.body;
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (product === null) throw new Error();
    if (product.stock < quantity) {
      return res.status(409).json({
        status: "409 Conflict",
        message: "Stock not enough!",
        availableStock: product.stock,
      });
    }
    const [createdOrder] = await prisma.$transaction([
      prisma.order.create({
        data: { userId, productId, quantity },
      }),
      prisma.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } },
      }),
    ]);
    res.status(201).json({
      status: "201 Created",
      message: "Create order success!",
      createdOrder,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to create order!",
    });
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { userId, productId, quantity } = req.body;
    const oldOrder = await prisma.order.findUnique({
      where: { id },
    });
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (oldOrder === null) throw new Error();
    if (product === null) throw new Error();
    const diff = quantity - oldOrder.quantity;
    if (product.stock < diff) {
      return res.status(409).json({
        status: "409 Conflict",
        message: "Stock not enough!",
        availableStock: product.stock,
      });
    }
    if (diff > 0) {
      await prisma.product.update({
        where: { id: oldOrder.productId },
        data: { stock: { decrement: diff } },
      });
    } else if (diff < 0) {
      await prisma.product.update({
        where: { id: oldOrder.productId },
        data: { stock: { increment: Math.abs(diff) } },
      });
    }
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { userId, productId, quantity },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Update order success!",
      updatedOrder,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Order not found!",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to update order!",
    });
  }
}

export async function deleteOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const oldOrder = await prisma.order.findUnique({
      where: { id },
    });
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (oldOrder === null) throw new Error();
    if (product === null) throw new Error();
    const [deletedOrder] = await prisma.$transaction([
      prisma.order.delete({
        where: { id },
      }),
      prisma.product.update({
        where: { id: oldOrder.productId },
        data: { stock: { increment: oldOrder.quantity } },
      }),
    ]);
    res.status(200).json({
      status: "200 OK",
      message: "Delete order success!",
      deletedOrder,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Order not found!",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to delete order!",
    });
  }
}
