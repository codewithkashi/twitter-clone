"use client";
import React, { useState, useEffect, useContext, SetStateAction } from "react";
import { BiLogoTwitter } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthContext } from "../Utils/Clients";
import { ImageUpload } from "..";

interface EditModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const EditModal = ({ open, setOpen }: EditModalProps) => {
  const router = useRouter();
  const { user, setUser, refresh, setRefresh } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user?.name as SetStateAction<string>);
    setUsername(user?.username as SetStateAction<string>);
    setProfileImage(user?.profileImage as SetStateAction<string>);
    setCoverImage(user?.coverImage as SetStateAction<string>);
    setBio(user?.bio as SetStateAction<string>);
  }, [user]);
  const hanleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch("/api/user/edit", {
        name,
        username,
        bio,
        coverImage,
        profileImage,
      });
      response.data.success
        ? (setUser(response.data.updatedUser),
          toast.success("Profile Updated"),
          setOpen(false),
          setRefresh(!refresh))
        : toast.error(response.data.success);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login__container">
      <div className="login__container-wrapper ">
        <div className="login__container-content">
          <BiLogoTwitter color="white" size={36} className="mt-10" />
          <div className="flex items-center justify-between p-10 rounded-t">
            <h3 className="login__container-heading">Update Profile</h3>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="flex flex-col gap-4" onSubmit={hanleUpdate}>
              <ImageUpload
                value={profileImage}
                disabled={loading}
                onChange={(image) => setProfileImage(image)}
                label="Upload Profile Photo"
              />
              <ImageUpload
                value={coverImage}
                disabled={loading}
                onChange={(image) => setCoverImage(image)}
                label="Upload Cover Photo"
              />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="login__container-input"
                required
                placeholder="Name"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                className="login__container-input"
                required
                placeholder="Username"
              />

              <textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                className="login__container-input"
                required
                placeholder="Bio"
              />
              <div className="flex flex-col gap-2 p-10">
                <button className="login__container-button" disabled={loading}>
                  Update
                </button>
              </div>
            </form>
          </div>
          <span
            className="text-sky-500 font-semibold text-xl mb-10 hover:cursor-pointer "
            onClick={() => setOpen(false)}
          >
            Cancel
          </span>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
