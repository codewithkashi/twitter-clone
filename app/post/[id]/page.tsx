"use client";
import React, { useContext, useEffect, useState } from "react";
import { Form, Header, PostItem, CommentFeed } from "@components";
import { useParams } from "next/navigation";
import { AuthContext } from "@components/Utils/Clients";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IPost } from "@types";
import { FormSkelton, PostSkelton } from "@components/Skeltons";
const PostData = () => {
  const { refresh, user, auth, setRefresh } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const params = useParams();
  // const [post, setPost] = useState({});
  const [post, setPost] = useState<IPost | null>(null);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/post/user/${params?.id}`);
        response.data.success
          ? (setPost(response.data.post), setComments(response.data.comments))
          : (setPost(null), router.push("/"));
      } catch (error) {}
    };
    fetchPostData();
  }, [refresh, auth]);
  return (
    <div>
      <Header label="Post" showBackArrow />
      {post?.id ? (
        <div>
          post?.id && <PostItem data={post} comments={comments} />
          <Form placeholder="Tweet your reply" isComment postId={post?.id} />
          <CommentFeed comments={comments} />
        </div>
      ) : (
        <>
          <PostSkelton />
          <FormSkelton />
          <PostSkelton />
        </>
      )}
    </div>
  );
};

export default PostData;
