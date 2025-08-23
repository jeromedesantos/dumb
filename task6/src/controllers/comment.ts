import { Request, Response } from "express";
import { prisma } from "../connections/client";
import { nanoid } from "nanoid";

export async function readComments(req: Request, res: Response) {
  try {
    const { sortBy, order, limit, offset } = req.query;
    const rawComments = await prisma.comment.findMany({
      include: {
        user: true,
        post: true,
      },
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch comments success!",
      comments: rawComments.map(({ user_id, post_id, ...rest }) => rest),
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch comments!",
    });
  }
}

export async function readComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const rawComment = await prisma.comment.findUnique({
      where: {
        comment_id: id,
      },
      include: {
        user: true,
        post: true,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch comment success!",
      comment: rawComment
        ? (({ user_id, post_id, ...rest }) => rest)(rawComment)
        : null,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch comment!",
    });
  }
}

export async function createComment(req: Request, res: Response) {
  try {
    const { comment, user_id, post_id } = req.body;
    const createdComment = await prisma.comment.create({
      data: {
        comment_id: "COMMENT-" + nanoid(10),
        comment,
        user_id,
        post_id,
      },
    });
    res.status(201).json({
      status: "201 Created",
      message: "Create comment success!",
      createdComment,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to create comment!",
    });
  }
}

export async function updateComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const { comment, user_id, post_id } = req.body;
    const updatedComment = await prisma.comment.update({
      data: {
        comment,
        user_id,
        post_id,
      },
      where: {
        comment_id: id,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Update comment success!",
      updatedComment,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to upadate comment!",
    });
  }
}

export async function deleteComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const deletedComment = await prisma.comment.delete({
      where: {
        comment_id: id,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Delete comment success!",
      deletedComment,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to delete comment!",
    });
  }
}
