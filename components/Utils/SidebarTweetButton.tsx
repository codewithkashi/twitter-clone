"use client";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { FaFeather } from "react-icons/fa";
import { AuthContext } from "./Clients";
import { SidebarTweetButtonSkelton } from "@components/Skeltons";
const SidebarTweetButton = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.id ? (
        <div onClick={() => router.push("/")}>
          <div className="sidebar__tweet-container">
            <FaFeather size={24} color="white" />
          </div>
          <div className="sidebar__tweet-container-text">
            <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
              Tweet
            </p>
          </div>
        </div>
      ) : (
        <SidebarTweetButtonSkelton />
      )}
    </>
  );
};

export default SidebarTweetButton;
