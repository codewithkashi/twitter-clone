"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Utils/Clients";
import axios from "axios";
import { toast } from "react-hot-toast";
import { PostItem } from "..";
import { PostSkelton } from "@components/Skeltons";
const PostFeed = ({ forProfile }: { forProfile?: boolean }) => {
  const { auth, refresh, user, allPosts, settAllPosts } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/post/all`);
        response.data.success
          ? settAllPosts(response.data.posts)
          : settAllPosts([]);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchPosts();
  }, [auth, refresh]);
  return (
    <>
      {!allPosts && (
        <>
          <PostSkelton />
          <PostSkelton />
          <PostSkelton />
        </>
      )}
      {allPosts?.map((e) => (
        <PostItem key={e.id} data={e} userId={user?.id} />
      ))}
    </>
  );
};

export default PostFeed;
