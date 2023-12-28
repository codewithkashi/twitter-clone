import React from "react";
import { Avatar } from "..";
import Image from "next/image";
import { User } from "@types";
const UserHero = ({ userData }: { userData: User | null }) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {userData?.coverImage && (
          <Image
            src={userData?.coverImage}
            alt="Cover Image"
            fill
            className="object-cover"
          />
        )}
        <div className="absolute -bottom-16 left-4  ">
          <Avatar
            userId={userData?.id}
            isLarge
            hasBorder
            profileImage={userData?.profileImage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
