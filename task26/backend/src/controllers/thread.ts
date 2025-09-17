import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
import { resolve } from "path";
import { writeFileSync } from "fs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { ThreadType } from "../types/thread";

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
    const rawThreads = await prisma.$queryRawUnsafe(
      ` SELECT
          T.id,
          U.photo_profile,
          U.full_name,
          U.username,
          EXTRACT(EPOCH FROM (NOW() - T."created_at"))::int AS age,
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
        OFFSET ${offset} LIMIT ${limit};`
    );
    dayjs.extend(relativeTime);
    const threads = (rawThreads as ThreadType[]).map((thread) => ({
      ...thread,
      age: dayjs(thread.created_at).fromNow(),
    }));
    res.status(200).json({
      status: "Success",
      message: "Fetch threads success!",
      data: threads,
    });
  } catch (err) {
    next(err);
  }
}

export async function getThreadById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const rawThreads = await prisma.$queryRawUnsafe(
      `SELECT
          T.id,
          U.photo_profile,
          U.full_name,
          U.username,
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
      WHERE T.id = '${id}'
      GROUP BY T.id, U.photo_profile, U.full_name, U.username;`
    );
    dayjs.extend(relativeTime);
    const threads = (rawThreads as ThreadType[]).map((thread) => ({
      ...thread,
      age: dayjs(thread.created_at).fromNow(),
    }));
    res.status(200).json({
      status: "Success",
      message: "Fetch threads success!",
      data: threads[0],
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
    const rawThreads = await prisma.$queryRawUnsafe(`
      SELECT
        T.id,
        U.photo_profile,
        U.full_name,
        U.username,
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
    dayjs.extend(relativeTime);
    const threads = (rawThreads as ThreadType[]).map((thread) => ({
      ...thread,
      age: dayjs(thread.created_at).fromNow(),
    }));
    io.emit("newThread", (threads as ThreadType[])[0]);
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
