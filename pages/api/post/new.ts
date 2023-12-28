import { isAuth } from "@libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prismadb";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
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

    const { body } = req.body;
    const post = await prisma.post.create({
      data: {
        body,
        userId: user.id,
      },
    });
    return res.json({
      success: true,
      message: "Tweet created",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
