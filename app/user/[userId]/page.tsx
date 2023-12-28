"use client";
import React, { useContext, useEffect, useState } from "react";
import { Header, UserBio, UserHero } from "@components";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@components/Utils/Clients";
import axios from "axios";
import { PostItem } from "@components";
import { User } from "@types";
import { PostSkelton, ProfileSkelton } from "@components/Skeltons";
const UserView = () => {
  const router = useRouter();
  const { allUsers, auth, refresh, userPosts, setUserPosts } =
    useContext(AuthContext);
  // const [userData, setUserData] = useState({});
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/profile/${params?.userId}`);
        response.data.success
          ? (setUserData(response.data.userProfile),
            setUserPosts(response.data.posts))
          : (setUserData(null), router.push("/login"));
      } catch (error) {}
    };
    fetchUser();
  }, [refresh, auth]);
  return (
    <>
      <Header label={userData?.name} showBackArrow />
      {userData ? (
        <>
          <UserHero userData={userData} />
          <UserBio userData={userData} />
        </>
      ) : (
        <ProfileSkelton />
      )}
      {userPosts ? (
        <>
          {userPosts?.map((e) => (
            <PostItem key={e.id} data={e} userId={e.user.id} />
          ))}
        </>
      ) : (
        <>
          {" "}
          <PostSkelton />
          <PostSkelton /> <PostSkelton />
        </>
      )}
    </>
  );
};

export default UserView;
