"use client";
import React from "react";
import { AvatarProps } from "@types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
const Avatar = ({
  username,
  hasBorder,
  userId,
  isLarge,
  profileImage,
}: AvatarProps) => {
  const router = useRouter();
  const goToProfile = () => {
    router.push(`/user/${userId}`);
  };
  return (
    <div
      className={`${hasBorder ? "border-4 border-sky-500" : ""} ${
        isLarge ? "h-32 w-32" : "h-12 w-12"
      } rounded-full hover:opacity-90 transition-all relative cursor-pointer`}
      onClick={goToProfile}
    >
      {profileImage ? (
        <Image
          src={"/kashif.JPG"}
          fill
          alt="Avatar"
          className={`object-cover rounded-full`}
        />
      ) : (
        <FaUserCircle color="white" size={`${isLarge ? 123 : 40}`} />
      )}
    </div>
  );
};

export default Avatar;
