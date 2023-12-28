import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { isAuth } from "@libs/serverAuth";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.json({
      success: false,
      message: "Only GET is allowed",
    });
  }
  try {
    const user = await isAuth(req, res);
    if (user) {
      res.json({
        success: true,
        user,
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
