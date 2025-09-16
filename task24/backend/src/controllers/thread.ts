import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";
// import { appError } from "../utils/error";

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
