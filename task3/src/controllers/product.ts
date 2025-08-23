import { Request, Response } from "express";
import { prisma } from "../connections/client";

export async function readProducts(req: Request, res: Response) {
  try {
    const products = await prisma.product.findMany();
    if (products.length === 0) {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Products not found!",
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Fetch products success!",
      products,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch products!",
    });
  }
}

export async function readProduct(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Wrong request ID type" });
    }
    const product = await prisma.product.findUnique({
      where: { id },
    });
    if (product === null) {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Products not found!",
      });
    }
    res.status(200).json({
      status: "200 OK",
      message: "Fetch product success!",
      product,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch product!",
    });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const { name, price } = req.body;
    const createdProduct = await prisma.product.create({
      data: { name, price },
    });
    res.status(201).json({
      status: "201 Created",
      message: "Create product success!",
      createdProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to create product!",
    });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Wrong request ID type" });
    }
    const { name, price } = req.body;
    const updatedProduct = await prisma.product.update({
      data: { name, price },
      where: { id },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Update product success!",
      updatedProduct,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Product not found!",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to upadate product!",
    });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id) || id <= 0) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Wrong request ID type" });
    }
    const deletedProduct = await prisma.product.delete({
      where: { id },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Delete product success!",
      deletedProduct,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "404 Not Found",
        message: "Product not found!",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to delete product!",
    });
  }
}
