import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import prisma from "@libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import { runMiddleware } from "@libs/Cors";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await runMiddleware(req, res, Cors());
  if (req.method !== "POST") {
    return res.json({
      success: false,
      message: "Only POST is allowed",
    });
  }
  try {
    const { email, password } = req.body;
    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userData == null) {
      return res.json({
        success: false,
        message: "Register First",
      });
    }
    if (userData.password !== null) {
      const isMatch = await bcrypt.compare(password, userData.password);
      if (!isMatch) {
        res.json({
          success: false,
          message: "Wrong Password",
        });
      } else if (userData.email != null && isMatch) {
        const token = jwt.sign({ _id: userData.id }, "kashif");
        res
          .setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
              maxAge: 1000 * 60 * 60 * 24,
              path: "/",
              httpOnly: true,
            })
          )
          .json({
            success: true,
            message: "Logged in",
          });
      }
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Serve Error",
    });
  }
};

export default handler;
