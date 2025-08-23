import { Request, Response } from "express";
import { prisma } from "../connections/client";
import { nanoid } from "nanoid";

export async function readPosts(req: Request, res: Response) {
  try {
    const { sortBy, order, limit, offset } = req.query;
    const rawPosts = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        [sortBy as string]: order as "asc" | "desc",
      },
      take: Number(limit),
      skip: Number(offset),
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
    const id = req.params.id;
    const rawPost = await prisma.post.findUnique({
      where: {
        post_id: id,
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

export async function readPostComment(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const rawPost = await prisma.post.findUnique({
      where: {
        post_id: id,
      },
      include: {
        user: true,
        comments: true,
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

export async function readPostSummary(req: Request, res: Response) {
  try {
    const { sortBy, maxComment, order, limit, offset } = req.query;
    const rawPosts = `
    SELECT p."post_id", p."title",
    COUNT(c."comment_id") AS "total_comments"
    FROM "Post" p
      LEFT JOIN "Comment" c
      ON c."post_id" = p."post_id"
      GROUP BY p."post_id", p."title"
      HAVING COUNT(c."comment_id")::int < ${Number(maxComment)}
      ORDER BY ${sortBy} ${order}
      LIMIT ${Number(limit)} OFFSET ${Number(offset)};
    `;
    const summary: any = await prisma.$queryRawUnsafe(rawPosts);
    // total comment bukan angka -> 3n string
    const sanitizedSummary = summary.map((item: any) => ({
      ...item,
      total_comments: Number(item.total_comments),
    }));
    console.log(sanitizedSummary);
    res.status(200).json({
      status: "200 OK",
      message: "Fetch summary success!",
      sanitizedSummary,
    });
  } catch (err) {
    console.log(err);
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
      data: {
        post_id: "POST-" + nanoid(10),
        title,
        content,
        user_id,
      },
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
    const id = req.params.id;
    const { title, content, user_id } = req.body;
    const updatedPost = await prisma.post.update({
      data: {
        title,
        content,
        user_id,
      },
      where: {
        post_id: id,
      },
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
    const id = req.params.id;
    const deletedPost = await prisma.post.delete({
      where: {
        post_id: id,
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
