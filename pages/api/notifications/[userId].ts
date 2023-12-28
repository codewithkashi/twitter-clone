import { isAuth } from "@libs/serverAuth";
import { NextApiResponse, NextApiRequest } from "next";
import prisma from "@libs/prismadb";
import { useId } from "react";
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
    if (userId && typeof userId === "string") {
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hasNotification: false,
        },
      });
      return res.json({
        success: true,
        notifications,
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
