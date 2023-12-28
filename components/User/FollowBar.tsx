"use client";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../Utils/Clients";
import { useRouter } from "next/navigation";
import { Avatar } from "..";
import axios from "axios";
import { User } from "@prisma/client";
import { FollowbarSkelton } from "@components/Skeltons";
const FollowBar = () => {
  const router = useRouter();
  const { auth, allUsers, setAllUsers, user } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/user/all");
      response.data.success
        ? setAllUsers(
            response.data.allUsers.filter((obj: User) => obj.id !== user?.id)
          )
        : (setAllUsers(null), router.push("/login"));
    };
    fetchPosts();
  }, [auth]);
  return (
    <>
      {user?.id ? (
        <div className="px-6 py-4 hidden lg:block ">
          <div className="bg-neutral-800 rounded-xl p-4 flex items-center justify-center flex-col">
            <h2 className="text-white text-xl font-semibold">Who to follow</h2>
            <div className="flex flex-col gap-6 mt-4">
              {allUsers?.map((e) => (
                <div className="flex flex-row gap-4" key={e.id}>
                  <Avatar
                    userId={e.id}
                    username={e.username}
                    profileImage={e?.profileImage}
                  />
                  <div className="flex flex-col">
                    <p className="text-white font-semibold text-sm">{e.name}</p>
                    <p className="text-neutral-400 text-sm">@{e.username}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <FollowbarSkelton />
      )}
    </>
  );
};

export default FollowBar;
