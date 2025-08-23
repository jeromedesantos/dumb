import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
import { appError } from "../utils/app-error";

export async function updateStocks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { updates } = req.body;
    await Promise.all(
      updates.map(async (update: any) => {
        const { id, stock } = update;
        await prisma.supplierStock.update({
          where: {
            id,
          },
          data: { stock },
        });
      })
    );
    res.status(200).json({ status: "success", messsage: "Stock Updated!" });
  } catch (err: any) {
    if (err.code === "P2025") {
      throw appError("Stock not found", 404);
    }
    next(err);
  }
}

export async function getStocks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stocks = await prisma.supplierStock.findMany();
    res.status(200).json({ status: "success", stocks });
  } catch (err) {
    next(err);
  }
}

export async function getSuppliers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const suppliers = await prisma.supplier.findMany();
    res.status(200).json({ status: "success", suppliers });
  } catch (err) {
    next(err);
  }
}

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json({ status: "success", products });
  } catch (err) {
    next(err);
  }
}
