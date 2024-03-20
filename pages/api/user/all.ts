import { NextApiResponse, NextApiRequest } from "next";
import prisma from "@libs/prismadb";
import { isAuth } from "@libs/serverAuth";
import Cors from "cors";
import { runMiddleware } from "@libs/Cors";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, Cors());
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
    const allUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.json({
      success: true,
      allUsers,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
