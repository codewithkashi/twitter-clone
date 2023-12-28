"use client";
import { Header, NotificationsFeed } from "@components";
import { AuthContext } from "@components/Utils/Clients";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
const Notifications = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  if (!user) return router.push("/login");
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed userId={user?.id} />
    </>
  );
};

export default Notifications;
