import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
// import { appError } from "../utils/error";

import { resolve } from "path";
import { writeFileSync } from "fs";

export async function getThreads(
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
    const rawThreads = `
        SELECT
          T.id,
          U.photo_profile,
          U.full_name,
          U.username,
          (NOW() - T.created_at)::text AS age_interval,
          T.content,
          T.image,
          COUNT(L.thread_id)::int AS number_of_likes,
          COUNT(R.thread_id)::int AS number_of_replies,         
          T.created_at,
          T.created_by,
          T.updated_at,
          T.updated_by
        FROM
          "Thread" AS T
        LEFT JOIN
          "Like" AS L ON T.id = L.thread_id
        LEFT JOIN
          "Reply" AS R ON T.id = R.thread_id
        LEFT JOIN
          "User" AS U ON T.created_by = U.id
        GROUP BY
          T.id, U.photo_profile, U.full_name, U.username
        ORDER BY ${sortBy} ${order}
        OFFSET ${offset} LIMIT ${limit};
    `;
    const threads = await prisma.$queryRawUnsafe(rawThreads);
    res.status(200).json({
      status: "Success",
      message: "Fetch threads success!",
      data: threads,
    });
  } catch (err) {
    next(err);
  }
}

export async function postThread(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { content } = req.body;
    const io = (req as any).io;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const createdThread = await prisma.thread.create({
      data: {
        content,
        image: fileName,
        created_by: (req as any).user.id,
        updated_by: (req as any).user.id,
      },
    });
    const rawThread = await prisma.$queryRawUnsafe(`
      SELECT
        T.id,
        U.photo_profile,
        U.full_name,
        U.username,
        (NOW() - T.created_at)::text AS age_interval,
        T.content,
        T.image,
        COUNT(L.thread_id)::int AS number_of_likes,
        COUNT(R.thread_id)::int AS number_of_replies,
        T.created_at,
        T.created_by,
        T.updated_at,
        T.updated_by
      FROM "Thread" AS T
      LEFT JOIN "Like" AS L ON T.id = L.thread_id
      LEFT JOIN "Reply" AS R ON T.id = R.thread_id
      LEFT JOIN "User" AS U ON T.created_by = U.id
      WHERE T.id = '${createdThread.id}'
      GROUP BY T.id, U.photo_profile, U.full_name, U.username
    `);
    interface ThreadType {
      data: ThreadType | null;
      id: string;
      photo_profile: string | null;
      full_name: string;
      username: string | null;
      age_interval: string | null;
      content: string | null;
      image: string | null;
      number_of_likes: number;
      number_of_replies: number;
      pending: boolean;
    }
    io.emit("newThread", (rawThread as ThreadType[])[0]);
    if (fileName && fileBuffer) {
      const savePath = resolve("src", "uploads", "thread", fileName);
      writeFileSync(savePath, fileBuffer);
    }
    res.status(201).json({
      status: "Success",
      message: `Create thread: ${content} success!`,
    });
  } catch (err) {
    next(err);
  }
}
