import bcrypt from "bcrypt";
import prisma from "@libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.json({
      success: false,
      message: "Only POST is allowed",
    });
  }

  try {
    const { name, username, email, password } = req.body;
    const validUsername =
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    if (!validUsername.test(username)) {
      return res.json({
        success: false,
        message: "Invlid Username",
      });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    const userName = await prisma.user.findUnique({ where: { username } });
    if (user || userName) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
    });
    return res.status(201).json({
      success: true,
      message: "User registered",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Serve Error",
    });
  }
};

export default handler;
