"use client";
import React, { useContext } from "react";
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { SidebarLogo, SidebarItem, SidebarTweetButton } from "..";
import axios from "axios";
import { AuthContext } from "./Clients";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const { auth, setAuth, user } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      response.data.success
        ? (toast.success(response.data.message),
          router.push("/login"),
          setAuth(false))
        : toast.error(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const sidebarItems = [
    {
      lable: "Home",
      href: "/",
      icon: BsHouseFill,
    },
    {
      lable: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      alert: user?.hasNotification,
    },
    {
      lable: "Profile",
      href: `/user/${user?.id}`,
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.lable}
              alert={item.alert}
            />
          ))}
          <div onClick={handleLogout}>
            <SidebarItem
              label="Logout"
              icon={BiLogOut}
              onClick={handleLogout}
            />
          </div>
          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
