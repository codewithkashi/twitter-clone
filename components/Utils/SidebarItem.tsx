"use client";
import React, { useContext } from "react";
import { SidebarItemProps } from "@types";
import Link from "next/link";
import { BsDot } from "react-icons/bs";
import { SideBarItemSkelton } from "@components/Skeltons";
import { AuthContext } from "./Clients";
const SidebarItem = ({ href, icon: Icon, label, alert }: SidebarItemProps) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user?.id ? (
        <div className="flex flex-row items-center">
          <Link href={`${href ? href : "/"}`}>
            <div className="sidebar__container">
              <Icon size={28} color="white" />
              {alert ? (
                <BsDot
                  className="text-sky-500 absolute -top-4 left-0"
                  size={70}
                />
              ) : null}
            </div>
            <div className="sidebar__container-icons">
              <Icon size={24} color="white" />
              <p className="hidden lg:block text-white text-xl">{label}</p>
              {alert ? (
                <BsDot
                  className="text-sky-500 absolute -top-4 left-0"
                  size={70}
                />
              ) : null}
            </div>
          </Link>
        </div>
      ) : (
        <SideBarItemSkelton />
      )}
    </>
  );
};

export default SidebarItem;
