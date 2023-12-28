import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/prismadb";
import { isAuth } from "@libs/serverAuth";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { postId } = req.body;
    const user = await isAuth(req, res);
    if (!user) {
      return res.json({
        success: false,
        message: "Login First",
      });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return res.json({
        success: false,
        message: "Invalid Post ID",
      });
    }
    let updatedLikedIds = [...post.likedIds] || [];
    if (req.method === "POST") {
      updatedLikedIds.push(user.id);
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: `${user.username} liked your tweet!`,
              userId: post.userId,
            },
          });

          await prisma.user.update({
            where: {
              id: post.userId,
            },
            data: {
              hasNotification: true,
            },
          });
        }
      } catch (error) {}
    } else if (req.method === "DELETE") {
      updatedLikedIds = updatedLikedIds.filter((e) => e !== user.id);
    }
    await prisma.post.update({
      where: { id: postId },
      data: {
        likedIds: updatedLikedIds,
      },
    });
    res.json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    res.json({
      success: false,
      messagge: "Internal serve error",
    });
  }
};

export default handler;
