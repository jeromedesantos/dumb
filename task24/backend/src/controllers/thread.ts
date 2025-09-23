import { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import { unlink, writeFileSync } from "fs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { prisma } from "../connections/client";
import { appError } from "../utils/error";
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
          COUNT(R.thread_id)::int AS number_of_replies,
          COUNT(L.thread_id)::int AS number_of_likes,
          COALESCE(array_agg(DISTINCT L.user_id) FILTER (WHERE L.user_id IS NOT NULL), '{}') AS liked_user_ids,
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
      isLiked: thread.liked_user_ids.includes((req as any).user.id),
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
          COUNT(R.thread_id)::int AS number_of_replies,
          COUNT(L.thread_id)::int AS number_of_likes,
          COALESCE(array_agg(DISTINCT L.user_id) FILTER (WHERE L.user_id IS NOT NULL), '{}') AS liked_user_ids,
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
      isLiked: thread.liked_user_ids.includes((req as any).user.id),
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
    const { io } = req as any;
    const { content } = req.body;
    const { id: user_id } = (req as any).user;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const createdThread = await prisma.thread.create({
      data: {
        content,
        image: fileName,
        created_by: user_id,
        updated_by: user_id,
      },
    });
    const rawThread = await prisma.$queryRawUnsafe(`
      SELECT
        T.id,
        U.photo_profile,
        U.full_name,
        U.username,
        T.content,
        T.image,
        COUNT(L.thread_id)::int AS number_of_likes,
        COUNT(R.thread_id)::int AS number_of_replies,
        COALESCE(array_agg(DISTINCT L.user_id) FILTER (WHERE L.user_id IS NOT NULL), '{}') AS liked_user_ids,
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
    const thread = {
      ...(rawThread as ThreadType[])[0],
      isLiked: (rawThread as ThreadType[])[0].liked_user_ids.includes(
        (req as any).user.id
      ),
      age: dayjs((rawThread as ThreadType[])[0].created_at).fromNow(),
    };

    io.emit("newThread", thread);
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

export async function deleteThread(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { io } = req as any;
    const { id } = req.params;
    const { id: user_id } = (req as any).user;
    const existingThread = (req as any).model;
    if (existingThread.created_by !== user_id) {
      throw appError("You are not authorized to delete this thread!", 403);
    }
    const repliesWithImages = await prisma.reply.findMany({
      where: { thread_id: id },
      select: { image: true },
    });
    await prisma.$transaction(async (tx) => {
      try {
        await tx.like.deleteMany({
          where: { thread_id: id },
        });
        await tx.reply.deleteMany({
          where: { thread_id: id },
        });
        return await tx.thread.delete({
          where: { id },
        });
      } catch (err: any) {
        throw appError(err.message, 500);
      }
    });
    io.emit("deleteThread", { id });
    if (existingThread.image) {
      const filePath = resolve(
        "src",
        "uploads",
        "thread",
        existingThread.image
      );
      repliesWithImages.forEach((reply) => {
        if (reply.image) {
          const filePath = resolve("src", "uploads", "reply", reply.image);
          unlink(filePath, (err) => {
            if (err) throw appError(`File cannot remove!: ${filePath}`, 500);
          });
        }
      });
      unlink(filePath, (err) => {
        if (err) throw appError(`File cannot remove!: ${filePath}`, 500);
      });
    }
    res.status(200).json({
      status: "Success",
      message: `Delete thread by id: ${id} success!`,
    });
  } catch (err) {
    next(err);
  }
}
