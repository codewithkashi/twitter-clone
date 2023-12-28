"use client";
import React, { useMemo, useContext, useState } from "react";
import { User } from "@types";
import { format } from "date-fns";
import { AuthContext } from "../Utils/Clients";
import Button from "../Utils/Button";
import { BiCalendar } from "react-icons/bi";
import { EditModal } from "..";
import axios from "axios";
import { toast } from "react-hot-toast";
const UserBio = ({ userData }: { userData: User | null }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, refresh, setRefresh } = useContext(AuthContext);
  const createdAt = useMemo(() => {
    if (!userData?.createdAt) {
      return null;
    }
    return format(new Date(userData.createdAt), "MMMM yyyy");
  }, [userData?.createdAt]);
  const handleFollow = async () => {
    setLoading(true);
    try {
      if (userData?.followerIds?.includes(user?.id as never)) {
        const response = await axios.delete("/api/user/follow", {
          data: { userId: userData.id },
        });
        response.data.success
          ? (toast.success(response.data.message), setRefresh(!refresh))
          : toast.error(response.data.message);
      } else {
        const response = await axios.post("/api/user/follow", {
          userId: userData?.id,
        });
        response.data.success
          ? (toast.success(response.data.message), setRefresh(!refresh))
          : toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2 ">
        {user?.id === userData?.id ? (
          <Button secondary label="Edit" onClick={() => setOpen(true)} />
        ) : (
          <Button
            label={
              userData?.followerIds?.includes(user?.id as never)
                ? "Un Follow"
                : "Follow"
            }
            secondary
            onClick={handleFollow}
            disabled={loading}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col ">
          <p className="text-white text-2xl font-semibold">{userData?.name}</p>
          <p className="text-white font-semibold">@{userData?.username}</p>
        </div>
        <div className="flex flex-col mt-4 ">
          <p className="text-white">{userData?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-400">
            <BiCalendar color="white" size={24} />
            <p className="text-white">Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white"> {userData?.followingIds?.length}</p>
            <p className="text-neutral-500">Following</p>
          </div>

          <div className="flex flex-row items-center gap-1">
            <p className="text-white"> {userData?.followerIds?.length || 0}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
      {open && <EditModal open={open} setOpen={setOpen} />}
    </div>
  );
};

export default UserBio;
