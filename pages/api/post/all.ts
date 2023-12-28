import { isAuth } from "@libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prismadb";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only GET and POST are allowed",
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

    const allPosts = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json({
      success: true,
      posts: allPosts,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
