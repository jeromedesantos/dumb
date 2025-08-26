import { Request, Response, NextFunction } from "express";
import { unlink } from "fs";
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
      where: { email },
    });
    if (user === null) {
      throw appError("Invalid email", 401);
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (isPasswordValid === false) {
      throw appError("Invalid password", 401);
    }
    const token = signToken({
      id: user.id,
      role: user.role,
    });
    const sanitizeUser = (({ password, ...rest }) => rest)(user);
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
        message: "Login success!",
        data: sanitizeUser,
        // token,
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
        message: "Logout successful.",
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
    const { sortBy = "id", order = "asc", offset = 0, limit = 10 } = req.query;
    const users = await prisma.user.findMany({
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      skip: Number(offset),
      take: Number(limit),
    });
    const sanitizeUsers = users.map(({ password, ...rest }) => rest);
    res.status(200).json({
      status: "Success",
      message: "Fetch users success!",
      data: sanitizeUsers,
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
      where: { id },
    });
    const sanitizeUser = user ? (({ password, ...rest }) => rest)(user) : null;
    res.status(200).json({
      status: "Success",
      message: "Fetch user success!",
      data: sanitizeUser,
    });
  } catch (err) {
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
    const profile = req.file?.filename as string;
    const hashedPassword = await hashPassword(password);
    const exitingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (exitingEmail) {
      throw appError("Email already exists!", 409);
    }
    const createdUser = await prisma.user.create({
      data: {
        id: generateKey("usr"),
        profile,
        name,
        email,
        role,
        password: hashedPassword,
      },
    });
    const sanitizeUser = createdUser
      ? (({ password, ...rest }) => rest)(createdUser)
      : null;
    res.status(201).json({
      status: "Success",
      message: "Create user success!",
      data: sanitizeUser,
    });
  } catch (err) {
    throw err;
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
    const profile = req.file?.filename as string;
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { profile, name, email, role, password: hashedPassword },
    });
    const sanitizeUser = updatedUser
      ? (({ password, ...rest }) => rest)(updatedUser)
      : null;
    res.status(200).json({
      status: "200 OK",
      message: "Update user success!",
      data: sanitizeUser,
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

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    const sanitizeUser = deletedUser
      ? (({ password, ...rest }) => rest)(deletedUser)
      : null;
    const filePath = resolve("src", "uploads", deletedUser.profile);
    unlink(filePath, (err) => {
      if (err) {
        throw appError("File cannot remove", 500);
      }
    });
    // fs promise
    // try {
    //   await unlink(path.join(filePath));
    // } catch (fileErr: any) {
    //   // Optional: log or tag the error for traceability
    //   return next(appError("Failed to remove profile image", 500));
    // }
    res.status(200).json({
      status: "Success",
      message: "Delete user success!",
      data: sanitizeUser,
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      throw appError("User not found", 404);
    }
    if (err.code === "P2003") {
      throw appError(
        "Failed to delete user: there are still posts referencing this user",
        409
      );
    }
    next(err);
  }
}
