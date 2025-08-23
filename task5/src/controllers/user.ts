import { Request, Response } from "express";
import { prisma } from "../connections/client";

export async function readUsers(req: Request, res: Response) {
  try {
    const { sortBy, order, limit, offset } = req.query;
    const users = await prisma.user.findMany({
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch users success!",
      users,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch users!",
    });
  }
}

export async function readUsersSummary(req: Request, res: Response) {
  try {
    const { sortBy, order, limit, offset } = req.query;
    const rawUsers = `
      SELECT
        u."id" AS "user_id",
        u."name",
        COUNT(o."id")::int AS "total_orders",
        SUM(o."quantity" * p.price)::numeric AS "total_spent"
      FROM
        "Order" o
      INNER JOIN
        "User" u ON o."userId" = u."id"
      INNER JOIN
        "Product" p ON o."productId" = p."id"
      GROUP BY
        u."id", u."name"
      ORDER BY
         ${sortBy} ${order}
      LIMIT ${Number(limit)} OFFSET ${Number(offset)};
    `;
    const summary = await prisma.$queryRawUnsafe(rawUsers);

    res.status(200).json({
      status: "200 OK",
      message: "Fetch users success!",
      summary,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch user!",
    });
  }
}

export async function readPostSummary(req: Request, res: Response) {
  try {
    const { sortBy, maxComment, order, limit, offset } = req.query;

    const allowedSort = ["post_id", "title", "total_comments"];
    const allowedOrder = ["asc", "desc"];

    const sortBySafe = allowedSort.includes(String(sortBy))
      ? sortBy
      : "post_id";
    const orderSafe = allowedOrder.includes(String(order)) ? order : "asc";
    const maxCommentSafe = !isNaN(Number(maxComment)) ? Number(maxComment) : 0;
    const limitSafe = !isNaN(Number(limit)) ? Number(limit) : 10;
    const offsetSafe = !isNaN(Number(offset)) ? Number(offset) : 0;

    const rawPosts = `
      SELECT 
        p."post_id", 
        p."title", 
        COUNT(c."comment_id") AS "total_comments" 
      FROM "Post" p 
      LEFT JOIN "Comment" c ON c."post_id" = p."post_id" 
      GROUP BY p."post_id", p."title" 
      HAVING COUNT(c."comment_id") < ${maxCommentSafe}
      ORDER BY ${sortBySafe} ${orderSafe}
      LIMIT ${limitSafe} OFFSET ${offsetSafe};
    `;

    const summary = await prisma.$queryRawUnsafe(rawPosts);

    res.status(200).json({
      status: "200 OK",
      message: "Fetch summary success!",
      summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch post!",
    });
  }
}

export async function readUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch user success!",
      user,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch user!",
    });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email } = req.body;
    const exitingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (exitingEmail) {
      return res.status(409).json({
        status: "409 Conflict",
        message: "Email already exists!",
      });
    }
    const createdUser = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json({
      status: "201 Created",
      message: "Create user success!",
      createdUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to create user!",
    });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Update user success!",
      updatedUser,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "404 Not Found",
        message: "User not found!",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to update user!",
    });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Delete user success!",
      deletedUser,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        status: "404 Not Found",
        message: "User not found!",
      });
    }
    if (err.code === "P2003") {
      return res.status(409).json({
        status: "409 Conflict",
        message:
          "Failed to delete user: there are still order referencing this user",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to delete user!",
    });
  }
}
