import express from "express";
import { Product, products } from "../models/product-model";

type Req = express.Request;
type Res = express.Response;

function readProducts(req: Req, res: Res) {
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil ditampilkan!",
    products,
  });
}

function createProducts(req: Req, res: Res) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Body",
    });
  }

  const { product, price } = req.body;
  if (typeof product !== "string") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Product harus String!",
    });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Price harus berupa angka positif",
    });
  }
  if (product === "" || price < 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Product dan Price tidak boleh kosong!",
    });
  }
  const createdProduct: Product = {
    product_id: `CD-${products.length + 1}`,
    product: product.trim(),
    price: price,
  };
  products.push(createdProduct);

  res.status(201).json({
    status: "201 Created",
    message: "Data berhasil ditambahkan!",
    createdProduct,
  });
}

function updateProducts(req: Req, res: Res) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Params",
    });
  }
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Request Body",
    });
  }

  const id = req.params.id;
  if (typeof id !== "string" || id.trim() === "") {
    return res
      .status(400)
      .json({ status: "400 Bad Request", message: "ID tidak valid!" });
  }

  const { product, price } = req.body;
  if (typeof product !== "string") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Product harus String!",
    });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Price harus berupa angka positif",
    });
  }
  if (product === "" || price < 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Product dan Price tidak boleh kosong!",
    });
  }

  if (!Array.isArray(products) || products.length == 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }
  const findProduct = products.find((product) => product.product_id === id);
  if (!findProduct) {
    return res
      .status(404)
      .json({ status: "404 Not Found", message: "Product tidak ditemukan!" });
  }

  const filteredProducts = products.filter(
    (product) => product.product_id !== id
  );
  const updatedProduct: Product = {
    product_id: findProduct.product_id,
    product: product.trim(),
    price,
  };
  products.splice(0, products.length, ...filteredProducts, updatedProduct);

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil diperbarui!",
    updatedProduct,
  });
}

function deleteProducts(req: Req, res: Res) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Params!",
    });
  }

  const id = req.params.id;
  if (typeof id !== "string" || id.trim() === "") {
    return res.status(400).json({ message: "ID tidak valid!" });
  }

  if (!Array.isArray(products) || products.length == 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }

  const findProduct = products.find((product) => product.product_id === id);
  if (!findProduct) {
    return res
      .status(404)
      .json({ status: "404 Not Found", message: "Product tidak ditemukan!" });
  }

  const filteredProducts = products.filter(
    (product) => product.product_id !== id
  );
  products.splice(0, products.length, ...filteredProducts);

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil dihapus!",
    deletedProduct: findProduct,
  });
}

export { readProducts, createProducts, updateProducts, deleteProducts };
