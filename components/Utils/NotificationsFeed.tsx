"use client";
import { NotificationSkelton } from "@components/Skeltons";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsTwitter } from "react-icons/bs";
const NotificationsFeed = ({ userId }: { userId: string }) => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!userId) return null;
        const response = await axios.get(`/api/notifications/${userId}`);
        response.data.success
          ? setNotifications(response.data.notifications)
          : setNotifications([]);
      } catch (error) {}
    };
    fetchNotifications();
  }, []);
  return (
    <>
      {notifications ? (
        <div className="flex flex-col">
          {notifications.map((notification: Record<string, any>) => (
            <div
              key={notification.id}
              className="flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800"
            >
              <BsTwitter color="white" size={32} />
              <p className="text-white">{notification.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <NotificationSkelton />
      )}
    </>
  );
};

export default NotificationsFeed;
