import React, { useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { Avatar } from "@components";
interface CommentItemProps {
  key?: string;
  data: Record<string, any>;
}
const CommentItem = ({ data }: CommentItemProps) => {
  const router = useRouter();
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);
  const goToProfile = () => {
    router.push(`/user/${data.userId}`);
  };

  return (
    <div
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.userId} profileImage={data?.profileUrl} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToProfile}
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            "
            >
              {data.name}
            </p>
            <span
              onClick={goToProfile}
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            "
            >
              @{data.username}
            </span>
          </div>
          <span className="text-neutral-500 text-sm">{createdAt}</span>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
