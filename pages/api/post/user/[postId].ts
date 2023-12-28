import { isAuth } from "@libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prismadb";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only POST is allowed",
    });
  }
  try {
    const user = await isAuth(req, res);
    if (!user) {
      return res.json({
        success: false,
        message: "Login First",
      });
    }
    const { postId } = req.query;
    if (req.method === "GET" && typeof postId === "string") {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
        },
      });
      const comments = await prisma.comment.findMany({
        where: {
          postId,
        },
      });
      return res.json({
        success: true,
        post,
        comments,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
