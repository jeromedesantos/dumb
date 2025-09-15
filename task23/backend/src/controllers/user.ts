import { Request, Response, NextFunction } from "express";
import { unlink, writeFileSync } from "fs";
import { resolve } from "path";
import { prisma } from "../connections/client";
import { appError } from "../utils/error";
import { signToken } from "../utils/jwt";
import { hashPassword, comparePassword } from "../utils/bcrypt";

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    if (user === null) {
      throw appError("Invalid email or username", 401);
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
    const { full_name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const exitingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (exitingEmail) {
      throw appError("Email already exists!", 409);
    }
    const createdUser = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          full_name,
          email,
          password: hashedPassword,
        },
      });
      await tx.user.update({
        where: { id: newUser.id },
        data: { created_by: newUser.id },
      });
      return newUser;
    });
    res.status(201).json({
      status: "Success",
      message: `Create user ${createdUser.full_name} success!`,
    });
  } catch (err) {
    next(err);
  }
}
// export async function createUser(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const { username, full_name, email, password, bio } = req.body;
//     const fileName = (req as any)?.processedFile?.fileName;
//     const fileBuffer = (req as any)?.processedFile?.fileBuffer;
//     const hashedPassword = await hashPassword(password);
//     const [exitingUsername, exitingEmail] = await Promise.all([
//       prisma.user.findUnique({
//         where: { username },
//       }),
//       prisma.user.findUnique({
//         where: { email },
//       }),
//     ]);
//     if (exitingUsername) {
//       throw appError("Username already exists!", 409);
//     }
//     if (exitingEmail) {
//       throw appError("Email already exists!", 409);
//     }
//     const createdUser = await prisma.$transaction(async (tx) => {
//       const newUser = await tx.user.create({
//         data: {
//           username,
//           full_name,
//           email,
//           password: hashedPassword,
//           photo_profile: fileName,
//           bio,
//         },
//       });
//       await tx.user.update({
//         where: { id: newUser.id },
//         data: { created_by: newUser.id },
//       });
//       return newUser;
//     });
//     const savePath = resolve("src", "uploads", "user", fileName);
//     writeFileSync(savePath, fileBuffer);
//     res.status(201).json({
//       status: "Success",
//       message: `Create user ${createdUser.full_name} success!`,
//     });
//   } catch (err) {
//     next(err);
//   }
// }

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, username } = (req as any).user;
    res.status(200).json({
      status: "Success",
      message: "Fetch user success!",
      data: { id, username },
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

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
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
      where: { id },
    });
    res.status(200).json({
      status: "Success",
      message: `Fetch user with id ${id} success!`,
      data: user,
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
    const { remove, username, full_name, email, password, bio } = req.body;
    const existingUser = (req as any).model;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update({
      data: {
        username,
        full_name,
        email,
        password: hashedPassword,
        photo_profile:
          remove === "ok" ? null : fileName ?? existingUser.photo_profile,
        bio,
        updated_by: existingUser.id,
      },
      where: { id },
    });
    if (fileName) {
      const savePath = resolve("src", "uploads", "user", fileName);
      const filePath = resolve(
        "src",
        "uploads",
        "user",
        existingUser.photo_profile
      );
      unlink(filePath, (err) => {
        if (err) {
          throw appError("File cannot remove!", 500);
        }
      });
      writeFileSync(savePath, fileBuffer);
    }
    res.status(200).json({
      status: "200 OK",
      message: `Update user ${updatedUser.username} success!`,
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
    const existingUser = (req as any).model;
    await prisma.user.delete({
      where: { id },
    });
    const filePath = resolve(
      "src",
      "uploads",
      "user",
      existingUser.photo_profile
    );
    unlink(filePath, (err) => {
      if (err) {
        throw appError("File cannot remove!", 500);
      }
    });
    res.status(200).json({
      status: "Success",
      message: `Delete user ${existingUser.username} success!`,
    });
  } catch (err) {
    next(err);
  }
}
