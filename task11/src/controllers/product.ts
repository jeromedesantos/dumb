import { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import { unlink } from "fs";
import { prisma } from "../connections/client";
import { generateKey } from "../utils/nanoid";
import { appError } from "../utils/error";

export async function readProducts(
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
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
      },
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
      where: {
        id,
        deletedAt: null,
      },
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
    const { file } = req as any;
    const { name, price, stock } = req.body;
    const createdProduct = await prisma.product.create({
      data: {
        id: generateKey("itm"),
        image: file,
        name,
        price: Number(price),
        stock: Number(stock),
      },
    });
    res.status(201).json({
      status: "Success",
      message: `Create product ${createdProduct.name} success!`,
    });
  } catch (err: any) {
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
    const { file } = req as any;
    const { name, price, stock } = req.body;
    const existingProduct = (req as any).product;
    const updatedProduct = await prisma.product.update({
      data: {
        image: file ?? existingProduct.image,
        name,
        price: Number(price),
        stock: Number(stock),
        updatedAt: new Date(),
      },
      where: {
        id,
        deletedAt: null,
      },
    });
    if (file) {
      const filePath = resolve("src", "uploads", existingProduct.image);
      unlink(filePath, (err) => {
        if (err) {
          throw appError("File cannot remove!", 500);
        }
      });
    }
    res.status(200).json({
      status: "Success",
      message: `Update product ${updatedProduct.name} success!`,
    });
  } catch (err: any) {
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
    const deletedProduct = await prisma.product.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
        deletedAt: null,
      },
    });
    res.status(200).json({
      status: "Success",
      message: `Delete product ${deletedProduct.name} success!`,
    });
  } catch (err: any) {
    next(err);
  }
}
