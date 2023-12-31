import { isAuth } from "@libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prismadb";
import uploadFile from "@libs/uploader";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.json({
      success: false,
      message: "Only PATCH is allowed",
    });
  }
  try {
    const user = await isAuth(req, res);
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Login First",
      });
    }
    const { name, username, bio, profileImage, coverImage } = req.body;
    if (!name || !username) {
      return res.json({
        success: false,
        message: "Name and Username can't be empty",
      });
    }
    const profile_img = await uploadFile(profileImage);
    const cover_img = await uploadFile(coverImage);
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name,
        username,
        bio,
        profileImage: profile_img,
        coverImage: cover_img,
      },
    });
    res.json({
      success: true,
      updatedUser,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
