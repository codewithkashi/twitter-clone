import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@libs/prismadb";
import { isAuth } from "@libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const user = await isAuth(req, res);
    if (!user) {
      return res.json({
        success: false,
        message: "Login First",
      });
    }
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      return res.json({
        success: false,
        message: "Invalid Post ID",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: user.id,
        postId,
        username: user.username,
        name: user.name,
      },
    });
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });

      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: `${user.username} commented ${body}`,
            userId: post.userId,
          },
        });

        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {}
    return res.json({
      success: true,
      message: "Tweeted!",
    });
  } catch (error) {
    return res.status(400).end();
  }
}
