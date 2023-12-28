import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prismadb";
import { isAuth } from "@libs/serverAuth";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.json({
      success: false,
      message: "Only POST and DELETE are allowed",
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
    const { userId } = req.body;
    const toFollow = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!toFollow) {
      return res.json({
        success: false,
        message: "Invalid User",
      });
    }
    let updatedFollowingIds = [...user.followingIds] || [];
    let updatedFollowerIds = [...toFollow.followerIds] || [];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);
      updatedFollowerIds.push(user.id);
      await prisma.notification.create({
        data: {
          body: `${user.username} started following you`,
          userId,
        },
      });
    } else if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
      updatedFollowerIds = updatedFollowerIds.filter(
        (followerId) => followerId !== user.id
      );
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    await prisma.user.update({
      where: {
        id: toFollow.id,
      },
      data: {
        followerIds: updatedFollowerIds,
      },
    });

    res.json({
      success: true,
      message: "Success",
    });
  } catch (error) {}
};

export default handler;
