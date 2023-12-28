"use client";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Utils/Clients";
import { toast } from "react-hot-toast";
import axios from "axios";
import Avatar from "./Avatar";
import Button from "../Utils/Button";
import { FormSkelton } from "@components/Skeltons";
interface FormPros {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}
const Form = ({ placeholder, postId, isComment }: FormPros) => {
  const { user, refresh, setRefresh } = useContext(AuthContext);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const createTweet = async () => {
    try {
      setLoading(true);
      const url = isComment
        ? `/api/post/comment?postId=${postId}`
        : "/api/post/new";
      const response = await axios.post(url, { body });
      response.data.success
        ? (toast.success(response.data.message),
          setBody(""),
          setRefresh(!refresh))
        : toast.error(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {user?.id ? (
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row gap-4 items-start">
              <Avatar userId={user?.id} profileImage={user?.profileImage} />
            </div>
            <div className="w-full">
              <textarea
                className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-white placeholder-neutral-500"
                disabled={loading}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder={placeholder}
              />
              <hr className="opacity-0 peer-focus:opacity-100 h-[1px] border-neutral-800 transition-all" />
              <div className="mt-4 flex flex-row justify-end">
                <Button
                  label="Tweet"
                  onClick={createTweet}
                  disabled={loading || !body}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <FormSkelton />
      )}
    </>
  );
};

export default Form;
