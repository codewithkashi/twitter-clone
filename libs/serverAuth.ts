import jwt from "jsonwebtoken";
import prisma from "@libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { IDecodedToken } from "@types";
import { JwtPayload } from "jsonwebtoken";
export const isAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(200).json({
      success: false,
      message: "Login First",
    });
  }
  const decodedToken = jwt.verify(token, "kashif") as JwtPayload;
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken._id,
    },
  });

  if (user) {
    return user;
  } else {
    return res.status(200).json({
      success: false,
      message: "Invalid Cookie",
    });
  }
};
