import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
import { appError } from "../utils/error";
import { signToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { resolve } from "path";
import { writeFileSync } from "fs";
import { randomUUID } from "crypto";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (user === null) {
      throw appError("Invalid username", 401);
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (user && isPasswordValid === false) {
      throw appError("Invalid password", 401);
    }
    const token = signToken({
      id: user.id,
      username: user.username,
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
        message: `Login User ${user.full_name} success!`,
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

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, full_name, email, password, bio } = req.body;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const hashedPassword = await hashPassword(password);
    const exitingUsername = await prisma.user.findUnique({
      where: { email },
    });
    const exitingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (exitingUsername) {
      throw appError("Username already exists!", 409);
    }
    if (exitingEmail) {
      throw appError("Email already exists!", 409);
    }
    const createdUser = await prisma.user.create({
      data: {
        id: randomUUID(),
        username,
        full_name,
        email,
        password: hashedPassword,
        photo_profile: fileName,
        bio,
      },
    });
    const savePath = resolve("src", "uploads", "user", fileName);
    writeFileSync(savePath, fileBuffer);
    res.status(201).json({
      status: "Success",
      message: `Create user ${createdUser.full_name} success!`,
    });
  } catch (err) {
    next(err);
  }
}

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = (req as any).user;
    res.status(200).json({
      status: "Success",
      message: "Fetch user success!",
      data: { id },
    });
  } catch (err) {
    next(err);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      sortBy = "created_at",
      order = "desc",
      offset = 0,
      limit = 10,
    } = req.query;
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        photo_profile: true,
        bio: true,
        created_at: true,
        created_by: true,
        updated_at: true,
        updated_by: true,
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
