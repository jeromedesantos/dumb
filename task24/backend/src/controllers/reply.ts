import { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import { writeFileSync } from "fs";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { prisma } from "../connections/client";
import type { ReplyType } from "../types/reply";

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
            R.image, 
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

export async function postReplyById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const io = (req as any).io;
    const fileName = (req as any)?.processedFile?.fileName;
    const fileBuffer = (req as any)?.processedFile?.fileBuffer;
    const createdReply = await prisma.reply.create({
      data: {
        user_id: (req as any).user.id,
        thread_id: id,
        content,
        image: fileName,
      },
    });
    const rawReply = await prisma.$queryRawUnsafe(
      `SELECT 
            R.id, 
            U.photo_profile, 
            U.full_name, 
            U.username,
            R.content, 
            R.image,
            R.created_at, 
            R.created_by, 
            R.updated_at, 
            R.updated_by
        FROM "Reply" AS R
        JOIN "User" AS U ON R.user_id = U.id
        WHERE R.id = '${createdReply.id}'
    `
    );
    dayjs.extend(relativeTime);
    const reply = {
      ...(rawReply as ReplyType[])[0],
      age: dayjs((rawReply as ReplyType[])[0].created_at).fromNow(),
    };
    io.emit("newReply", reply);
    if (fileName && fileBuffer) {
      const savePath = resolve("src", "uploads", "reply", fileName);
      writeFileSync(savePath, fileBuffer);
    }
    res.status(201).json({
      status: "Success",
      message: `Create reply: ${content} success!`,
    });
  } catch (err) {
    next(err);
  }
}
