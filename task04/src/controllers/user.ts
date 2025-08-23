import { Request, Response } from "express";
import { prisma } from "../connections/client";

export async function readUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany();
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

export async function readUser(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
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
    const { username, email } = req.body;
    const exitingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exitingEmail) {
      return res.status(409).json({
        status: "409 Conflict",
        message: "Email already exists!",
      });
    }
    const createdUser = await prisma.user.create({
      data: { username, email },
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
    const id = req.params.id;
    const { username, email } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        user_id: id,
      },
      data: { username, email },
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
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({
      where: {
        user_id: id,
      },
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
          "Failed to delete user: there are still posts referencing this user",
      });
    }
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to delete user!",
    });
  }
}
