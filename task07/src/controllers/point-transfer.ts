import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
import { appError } from "../utils/app-error";

export async function transferPoints(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { senderId, receiverId, amount } = req.body;
    const sender = await prisma.user.findUnique({ where: { id: senderId } });
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });
    if (sender === null) {
      throw appError("Sender not Found!", 404);
    }
    if (receiver === null) {
      throw appError("Reciever not Found!", 404);
    }
    if (sender.points < amount) {
      throw appError("Not Enought Amount!", 409);
    }
    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });
      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });
      // throw appError("Error Simulation", 400);
    });
    res
      .status(201)
      .json({ status: "success", message: "Amount Transfer Success!" });
  } catch (err: unknown) {
    next(err);
  }
}

export async function getUserPoints(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        points: true,
      },
    });
    console.log({ users });
    if (users.length === 0) {
      throw appError("Sender Not Found!", 404);
    }

    res.status(200).json({
      status: "success",
      message: "Fetch Users Success!",
      users,
    });
  } catch (err: unknown) {
    next(err);
  }
}
