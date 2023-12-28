import prisma from "@libs/prismadb";
import { isAuth } from "@libs/serverAuth";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next/types";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only GET is allowed",
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
    const { userId } = req.query;
    if (typeof userId === "string") {
      const userProfile = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.json({
        success: true,
        userProfile,
        posts,
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
