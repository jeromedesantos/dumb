import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
// import { resolve } from "path";
// import { writeFileSync } from "fs";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { ThreadType } from "../types/thread";
import { ReplyType } from "../types/reply";

export async function getReplyById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const {
      sortBy = "created_at",
      order = "desc",
      offset = 0,
      limit = 10,
    } = req.query;
    const rawReply = await prisma.$queryRawUnsafe(
      `SELECT 
            R.id, 
            U.photo_profile, 
            U.full_name, 
            U.username, 
            R.content, 
            R.created_at, 
            R.created_by, 
            R.updated_at, 
            R.updated_by
        FROM "Reply" AS R
        JOIN "User" AS U ON R.user_id = U.id
        WHERE R.thread_id = '${id}'
        ORDER BY ${sortBy} ${order}
        OFFSET ${offset} LIMIT ${limit}`
    );
    dayjs.extend(relativeTime);
    const reply = (rawReply as ReplyType[]).map((thread) => ({
      ...thread,
      age: dayjs(thread.created_at).fromNow(),
    }));
    res.status(200).json({
      status: "Success",
      message: "Fetch threads success!",
      data: reply,
    });
  } catch (err) {
    next(err);
  }
}
