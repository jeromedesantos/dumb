import { Request, Response, NextFunction } from "express";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { prisma } from "../connections/client";
import type { ThreadType } from "../types/thread";

export async function postLike(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { io } = req as any;
    const { id: thread_id } = req.params;
    const { id: user_id } = (req as any).user;
    const isExist = await prisma.like.findFirst({
      where: { thread_id, user_id },
    });
    if (isExist?.user_id === user_id) {
      await prisma.like.deleteMany({
        where: { thread_id, user_id },
      });
      io.emit("deleteLike", { id: isExist?.id });
      console.log("delete");
      return res.json({
        status: "Success",
        message: "Like deleted successfully",
      });
    }
    const createdLike = await prisma.like.create({
      data: {
        user_id,
        thread_id,
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
        T.created_at,
        T.created_by,
        T.updated_at,
        T.updated_by
      FROM "Thread" AS T
      LEFT JOIN "Like" AS L ON T.id = L.thread_id
      LEFT JOIN "Reply" AS R ON T.id = R.thread_id
      LEFT JOIN "User" AS U ON T.created_by = U.id
      WHERE T.id = '${createdLike.thread_id}'
      GROUP BY T.id, U.photo_profile, U.full_name, U.username
    `);
    dayjs.extend(relativeTime);
    const thread = {
      ...(rawThread as ThreadType[])[0],
      age: dayjs((rawThread as ThreadType[])[0].created_at).fromNow(),
    };
    io.emit("newLike", thread);
    console.log("create");
    res.status(201).json({
      status: "Success",
      message: `Create like for thread: ${thread_id} success!`,
    });
  } catch (err) {
    next(err);
  }
}
