import express from "express";
import { Order, orders } from "../models/order-model";
import { Product, products } from "../models/product-model";

type Req = express.Request;
type Res = express.Response;

function readOrders(req: Req, res: Res) {
  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Product tidak boleh kosong!",
    });
  }

  const relationOrders = orders.map((order) => {
    return {
      no: order.no,
      product: order.product_id.map(
        (product_id) =>
          products.find((product) => product.product_id === product_id) || null
      ),
      qty: order.qty,
      sum: order.sum,
    };
  });

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil ditampilkan!",
    relationOrders,
  });
}

function createOrders(req: Req, res: Res) {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Body!",
    });
  }

  const { product_id } = req.body;
  if (!Array.isArray(product_id) || product_id.length === 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Daftar Product tidak boleh kosong!",
    });
  }

  const productIds = products.map((p) => p.product_id);
  const arrayProduct = product_id.every((id) => productIds.includes(id));

  if (!arrayProduct) {
    return res
      .status(404)
      .json({ status: "404 Not Found", message: "Product tidak ditemukan!" });
  }

  const createdOrder: Order = {
    no: orders.length + 1,
    product_id,
    qty: product_id.length,
    sum: products
      .filter((product) => product_id.includes(product.product_id))
      .reduce((sum, product) => sum + product.price, 0),
  };
  orders.push(createdOrder);

  res.status(201).json({
    status: "201 Created",
    message: "Data berhasil ditambahkan!",
    createdOrder,
  });
}

function updateOrders(req: Req, res: Res) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Params!",
    });
  }
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Body!",
    });
  }

  const id = parseInt(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return res
      .status(400)
      .json({ status: "400 Bad Request", message: "Format Post ID salah!" });
  }

  const { product_id } = req.body;
  if (!Array.isArray(product_id) || product_id.length === 0) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Daftar Product tidak boleh kosong!",
    });
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }
  const findOrder = orders.find((order) => order.no === id);
  if (!findOrder) {
    return res
      .status(404)
      .json({ status: "404 Not Found", message: "Order tidak ditemukan!" });
  }
  const filteredOrders = orders.filter((order) => order.no !== id);
  const updatedOrder: Order = {
    no: findOrder.no,
    product_id,
    qty: product_id.length,
    sum: products.reduce((sum, product) => sum + product.price, 0),
  };
  orders.splice(0, orders.length, ...filteredOrders, updatedOrder);

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil diperbarui!",
    updatedOrder,
  });
}

function deleteOrders(req: Req, res: Res) {
  if (!req.params) {
    return res.status(400).json({
      status: "400 Bad Request",
      message: "Tidak ada Request Params!",
    });
  }

  const id = parseInt(req.params.id);
  if (!Number.isFinite(id) || id <= 0) {
    return res
      .status(400)
      .json({ status: "400 Bad Request", message: "Format Post ID salah!" });
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return res.status(204).json({
      status: "204 No Content",
      message: "Data masih kosong!",
    });
  }
  const findOrder = orders.find((order) => order.no === id);
  if (!findOrder) {
    return res
      .status(404)
      .json({ status: "404 Not Found", message: "Order tidak ditemukan!" });
  }

  const filteredOrders = orders.filter((order) => order.no !== id);
  orders.splice(0, orders.length, ...filteredOrders);

  res.status(200).json({
    status: "200 OK",
    message: "Data berhasil dihapus!",
    deletedOrder: findOrder,
  });
}

export { readOrders, createOrders, updateOrders, deleteOrders };
