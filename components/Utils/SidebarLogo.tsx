"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { BsTwitter } from "react-icons/bs";
import { AuthContext } from "./Clients";
import { SidebarLogoSkelton } from "@components/Skeltons";
const SidebarLogo = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.id ? (
        <div className="sidebar__logo" onClick={() => router.push("/")}>
          <BsTwitter size={28} color="white" />
        </div>
      ) : (
        <SidebarLogoSkelton />
      )}
    </>
  );
};

export default SidebarLogo;
