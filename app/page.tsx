"use client";
import React from "react";
import { useEffect, useContext } from "react";
import { AuthContext } from "@components/Utils/Clients";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Header, Form, PostFeed } from "@components";
const Home = () => {
  const router = useRouter();
  const { auth, setAuth, user, setUser, refresh } = useContext(AuthContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/user/current");
      response.data.success
        ? (setUser(response.data.user), setAuth(true))
        : (setUser(null), router.push("/login"), setAuth(false));
    };
    fetchPosts();
  }, [auth, refresh]);
  return (
    <div>
      {" "}
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed forProfile={false} />
    </div>
  );
};

export default Home;
