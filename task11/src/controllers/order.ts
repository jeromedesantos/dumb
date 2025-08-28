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
    if (product && product.stock < qty) {
      throw appError("Insufficient stock!", 400);
    }
    const createdOrder = await prisma.$transaction(async (tx) => {
      await tx.order.create({
        data: {
          id: generateKey("itm"),
          userId,
          productId,
          qty,
        },
      }),
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: qty } },
        });
    });
    console.log(createdOrder);
    res.status(201).json({
      status: "201 Created",
      message: `Create order ${createdOrder} success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function restoreOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {}
