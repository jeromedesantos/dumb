import { Request, Response, NextFunction } from "express";
import { unlink } from "fs";
import { resolve } from "path";
import { prisma } from "../connections/client";
import { generateKey } from "../utils/nanoid";
import { appError } from "../utils/error";

export async function readProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { sortBy = "id", order = "asc", offset = 0, limit = 10 } = req.query;
    const products = await prisma.product.findMany({
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      skip: Number(offset),
      take: Number(limit),
    });
    res.status(200).json({
      status: "Success",
      message: "Fetch products success!",
      data: products,
    });
  } catch (err) {
    next(err);
  }
}

export async function readProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    res.status(200).json({
      status: "Success",
      message: "Fetch product success!",
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, price, stock } = req.body;
    const image = req.file?.filename as string;
    const createdProduct = await prisma.product.create({
      data: {
        id: generateKey("itm"),
        image,
        name,
        price: Number(price),
        stock: Number(stock),
      },
    });
    res.status(201).json({
      status: "Success",
      message: "Create product success!",
      data: createdProduct,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    const image = req.file?.filename as string;
    const updatedProduct = await prisma.product.update({
      data: {
        image,
        name,
        price: Number(price),
        stock: Number(stock),
      },
      where: { id },
    });
    res.status(200).json({
      status: "Success",
      message: "Update product success!",
      data: updatedProduct,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      throw appError("Product Not Found!", 404);
    }
    next(err);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    const filePath = resolve("src", "uploads", deletedProduct.image);
    unlink(filePath, (err) => {
      if (err) {
        throw appError("File cannot remove", 500);
      }
    });
    res.status(200).json({
      status: "Success",
      message: "Delete product success!",
      data: deletedProduct,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      throw appError("Product Not Found!", 404);
    }
    next(err);
  }
}
