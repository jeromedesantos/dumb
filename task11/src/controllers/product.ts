import { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import { writeFileSync, renameSync, unlink } from "fs";
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
      order = "desc",
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

export async function searchProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      name,
      sortBy = "createdAt",
      order = "desc",
      offset = 0,
      limit = 10,
    } = req.query;
    if (!name || typeof name !== "string") {
      throw appError(
        "Product name must be a string and is required for search!",
        400
      );
    }
    const products = await prisma.product.findMany({
      where: {
        deletedAt: null,
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      skip: Number(offset),
      take: Number(limit),
    });
    if (products.length === 0) {
      throw appError("Product not found!", 400);
    }
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
    const { name, price, stock } = req.body;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const createdProduct = await prisma.product.create({
      data: {
        id: generateKey("prd"),
        image: fileName,
        name,
        price: Number(price),
        stock: Number(stock),
      },
    });
    const savePath = resolve("src", "uploads", "product", fileName);
    writeFileSync(savePath, fileBuffer);
    res.status(201).json({
      status: "Success",
      message: `Create product ${createdProduct.name} success!`,
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
    const existingProduct = (req as any).model;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const updatedProduct = await prisma.product.update({
      data: {
        image: fileName ?? existingProduct.image,
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
    if (fileName) {
      const savePath = resolve("src", "uploads", "product", fileName);
      const filePath = resolve(
        "src",
        "uploads",
        "product",
        existingProduct.image
      );
      unlink(filePath, (err) => {
        if (err) {
          throw appError("File cannot remove!", 500);
        }
      });
      writeFileSync(savePath, fileBuffer);
    }
    res.status(200).json({
      status: "Success",
      message: `Update product ${updatedProduct.name} success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function restoreProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const restoredProduct = await prisma.product.update({
      data: {
        deletedAt: null,
      },
      where: {
        id,
        deletedAt: { not: null },
      },
    });
    if (restoredProduct) {
      const oldPath = resolve(
        "src",
        "uploads",
        "product",
        "temp_" + restoredProduct.image
      );
      const newPath = resolve(
        "src",
        "uploads",
        "product",
        restoredProduct.image
      );
      renameSync(oldPath, newPath);
    }
    res.status(200).json({
      status: "Success",
      message: `Restore product ${restoredProduct.name} success!`,
    });
  } catch (err) {
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
    const oldPath = resolve("src", "uploads", "product", deletedProduct.image);
    const newPath = resolve(
      "src",
      "uploads",
      "product",
      "temp_" + deletedProduct.image
    );
    renameSync(oldPath, newPath);
    res.status(200).json({
      status: "Success",
      message: `Delete product ${deletedProduct.name} success!`,
    });
  } catch (err) {
    next(err);
  }
}
