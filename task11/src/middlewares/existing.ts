import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
import { appError } from "../utils/error";

export async function isUserDeleted(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (user === null) {
    throw appError("User Not Found!", 404);
  }
  if (user.deletedAt !== null) {
    throw appError("User has been deleted!!", 400);
  }
  (req as any).user = user;
  next();
}

export async function isProductDeleted(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product === null) {
      throw appError("Product Not Found!", 404);
    }
    if (product.deletedAt !== null) {
      throw appError("Product has been deleted!!", 404);
    }
    (req as any).product = product;
    next();
  } catch (err) {
    next(err);
  }
}

export async function isUserExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user === null) {
      throw appError("User Not Found!", 404);
    }
    next();
  } catch (err) {
    next(err);
  }
}

export async function isProductExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product === null) {
      throw appError("Product Not Found!", 404);
    }
    next();
  } catch (err) {
    next(err);
  }
}
