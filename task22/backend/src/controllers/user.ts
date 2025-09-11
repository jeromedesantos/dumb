import { Request, Response, NextFunction } from "express";
import { writeFileSync, renameSync, unlink } from "fs";
import { resolve } from "path";
import { prisma } from "../connections/client";
import { generateKey } from "../utils/nanoid";
import { appError } from "../utils/error";
import { signToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/bcrypt";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
    if (user === null) {
      throw appError("Invalid email", 401);
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (user && isPasswordValid === false) {
      throw appError("Invalid password", 401);
    }
    const token = signToken({
      id: user.id,
      role: user.role,
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
        path: "/",
      })
      .status(200)
      .json({
        status: "Success",
        message: `Login User ${user.name} success!`,
      });
  } catch (err) {
    next(err);
  }
}

export function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
      .status(200)
      .json({
        status: "Success",
        message: "Logout successful!",
      });
  } catch (err) {
    next(err);
  }
}

export async function readUsersSummary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      sortBy = "u.id",
      order = "desc",
      offset = 0,
      limit = 10,
    } = req.query;
    const rawUsers = `
      SELECT
        u."id" AS "userId",
        u."name",
        COUNT(o."id")::int AS "totalOrders",
        SUM(o."qty" * p.price)::numeric AS "totalSpent"
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
      status: "Success",
      message: "Fetch summary success!",
      data: summary,
    });
  } catch (err) {
    next(err);
  }
}

export async function readUsers(
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
    const users = await prisma.user.findMany({
      select: {
        id: true,
        profile: true,
        name: true,
        email: true,
        point: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
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
      message: "Fetch users success!",
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

export async function searchUsers(
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
      const users = await prisma.user.findMany({
        select: {
          id: true,
          profile: true,
          name: true,
          email: true,
          point: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
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
        message: "Fetch users success!",
        data: users,
      });
      return;
    }
    const users = await prisma.user.findMany({
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
    res.status(200).json({
      status: "Success",
      message: "Fetch users success!",
      data: users,
    });
  } catch (err) {
    next(err);
  }
}

export async function readUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        profile: true,
        name: true,
        email: true,
        point: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      where: {
        id,
        deletedAt: null,
      },
    });
    res.status(200).json({
      status: "Success",
      message: "Fetch user success!",
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, role } = (req as any).user;
    res.status(200).json({
      status: "Success",
      message: "Fetch user success!",
      data: { id, role },
    });
  } catch (err) {
    next(err);
  }
}

export async function transferPoint(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { senderId, receiverId, amount } = req.body;
    const idUser = (req as any).user.id;
    if (senderId !== idUser) {
      throw appError("Cannot use other user's account!", 400);
    }
    if (senderId === receiverId) {
      throw appError("Cannot transfer to yourself!", 400);
    }
    const [sender, reciever] = await Promise.all([
      prisma.user.findUnique({
        where: { id: senderId, deletedAt: null },
      }),
      prisma.user.findUnique({
        where: { id: receiverId, deletedAt: null },
      }),
    ]);
    if (sender === null) {
      throw appError("Sender not found!", 404);
    }
    if (reciever === null) {
      throw appError("Receiver not found!", 404);
    }
    if (sender.point < amount) {
      throw appError("Not enough points!", 409);
    }
    await prisma.$transaction(async (tx) => {
      try {
        await tx.user.update({
          where: { id: senderId, deletedAt: null },
          data: { point: { decrement: amount } },
        });
        await tx.user.update({
          where: { id: receiverId, deletedAt: null },
          data: { point: { increment: amount } },
        });
      } catch (err: any) {
        throw appError(err.message, 500);
      }
    });
    res.status(201).json({
      status: "Success",
      message: "Amount transfer successful!",
    });
  } catch (err: any) {
    next(err);
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, email, role, password } = req.body;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const hashedPassword = await hashPassword(password);
    const exitingEmail = await prisma.user.findUnique({
      where: { email, deletedAt: null },
    });
    if (exitingEmail) {
      throw appError("Email already exists!", 409);
    }
    const createdUser = await prisma.user.create({
      data: {
        id: generateKey("usr"),
        profile: fileName,
        name,
        email,
        role,
        password: hashedPassword,
      },
    });
    const savePath = resolve("src", "uploads", "user", fileName);
    writeFileSync(savePath, fileBuffer);
    res.status(201).json({
      status: "Success",
      message: `Create user ${createdUser.name} success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;
    const existingUser = (req as any).model;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update({
      data: {
        profile: fileName ?? existingUser.profile,
        name: name ? name : existingUser.name,
        email: email ? email : existingUser.email,
        role: role ? role : existingUser.role,
        password: hashedPassword ? hashedPassword : existingUser.password,
        updatedAt: new Date(),
      },
      where: {
        id,
        deletedAt: null,
      },
    });
    if (fileName) {
      const savePath = resolve("src", "uploads", "user", fileName);
      const filePath = resolve("src", "uploads", "user", existingUser.profile);
      unlink(filePath, (err) => {
        if (err) {
          throw appError("File cannot remove!", 500);
        }
      });
      writeFileSync(savePath, fileBuffer);
    }
    res.status(200).json({
      status: "200 OK",
      message: `Update user ${updatedUser.name} success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function restoreUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const restoredUser = await prisma.user.update({
      data: {
        deletedAt: null,
      },
      where: {
        id,
        deletedAt: { not: null },
      },
    });
    if (restoredUser) {
      const oldPath = resolve(
        "src",
        "uploads",
        "user",
        "temp_" + restoredUser.profile
      );
      const newPath = resolve("src", "uploads", "user", restoredUser.profile);
      renameSync(oldPath, newPath);
    }
    res.status(200).json({
      status: "Success",
      message: `Restore user ${restoredUser.name} success!`,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
        deletedAt: null,
      },
    });
    const oldPath = resolve("src", "uploads", "user", deletedUser.profile);
    const newPath = resolve(
      "src",
      "uploads",
      "user",
      "temp_" + deletedUser.profile
    );
    renameSync(oldPath, newPath);
    res.status(200).json({
      status: "Success",
      message: `Delete user ${deletedUser.name} success!`,
    });
  } catch (err) {
    next(err);
  }
}
