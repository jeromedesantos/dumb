import { Request, Response } from "express";
import { prisma } from "../connections/client";

export async function readPosts(req: Request, res: Response) {
  try {
    const rawPosts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch posts success!",
      posts: rawPosts.map(({ user_id, ...rest }) => rest),
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch posts!",
    });
  }
}

export async function readPost(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id) || id < 0) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Wrong request ID type" });
    }
    const rawPost = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Fetch post success!",
      post: rawPost ? (({ user_id, ...rest }) => rest)(rawPost) : null,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to fetch post!",
    });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { title, content, user_id } = req.body;
    const createdPost = await prisma.post.create({
      data: { title, content, user_id },
    });
    res.status(201).json({
      status: "201 Created",
      message: "Create product success!",
      createdPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to create product!",
    });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id) || id < 0) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Wrong request ID type" });
    }
    const { title, content, user_id } = req.body;
    const updatedPost = await prisma.post.update({
      data: { title, content, user_id },
      where: { id },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Update post success!",
      updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to upadate post!",
    });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    if (!Number.isFinite(id) || id < 0) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Wrong request ID type" });
    }
    const deletedPost = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: "200 OK",
      message: "Delete post success!",
      deletedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: "500 Internal Server Error",
      message: "Failed to delete post!",
    });
  }
}
