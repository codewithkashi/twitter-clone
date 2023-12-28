import React, { useMemo, useContext } from "react";
import { PostItemProps } from "@types";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar } from "..";
import { AuthContext } from "../Utils/Clients";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-hot-toast";
import { comment } from "postcss";
import { PostSkelton } from "@components/Skeltons";
const PostItem = ({ data, userId, comments }: PostItemProps) => {
  const { user, refresh, setRefresh } = useContext(AuthContext);
  const router = useRouter();
  const toToUser = (event: any) => {
    router.push(`/user/${data.user.id}`);
  };
  const goToPost = () => {
    router.push(`/post/${data.id}`);
  };
  const goToProfile = () => {
    router.push(`/user/${data.user.id}`);
  };
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const handleLike = async () => {
    try {
      if (data?.likedIds?.includes(user?.id as never)) {
        const response = await axios.delete("/api/post/like", {
          data: { postId: data?.id },
        });
        response.data.success
          ? (toast.success(response.data.message), setRefresh(!refresh))
          : toast.error(response.data.message);
      } else {
        const response = await axios.post("/api/post/like", {
          postId: data?.id,
        });
        response.data.success
          ? (toast.success(response.data.message), setRefresh(!refresh))
          : toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition-all">
      <div className="flex flex-row items-start gap-3 ">
        <Avatar userId={data?.user.id} profileImage={data?.user.profileImage} />
        <div>
          <div className="flex flex-col items-start gap-2 ">
            <p
              className="text-white font-semibold cursor-pointer flex flex-row"
              onClick={goToProfile}
            >
              {data?.user.name}
              <span
                className="text-neutral-500 cursor-pointer hover:underline hidden md:block ml-2"
                onClick={goToProfile}
              >
                @{data?.user.username}
              </span>
            </p>

            <p className="text-neutral-500">{createdAt}</p>
          </div>
          <div>
            <div className="text-white mt-2" onClick={goToPost}>
              {data?.body}
            </div>
            <div className="flex flex-row items-center gap-10 mt-3">
              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition-all hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>{comments?.length}</p>
              </div>
              <div
                className={`flex flex-row items-center ${
                  data?.likedIds?.includes(user?.id as never)
                    ? "text-red-500 hover:text-neutral-500"
                    : "text-neutral-500 hover:text-red-500"
                } gap-2 cursor-pointer transition-all `}
                onClick={handleLike}
              >
                {data?.likedIds?.includes(user?.id as never) ? (
                  <FcLike size={20} />
                ) : (
                  <AiOutlineHeart color="white" size={20} />
                )}
                <p>{data?.likedIds?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
