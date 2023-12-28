"use client";
import { Header, NotificationsFeed } from "@components";
import { AuthContext } from "@components/Utils/Clients";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
const Notifications = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) return router.push("/login");
  }, [user]);
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed userId={user?.id} />
    </>
  );
};

export default Notifications;
