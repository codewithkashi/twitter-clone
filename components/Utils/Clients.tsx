"use client";
import React, { useState, createContext } from "react";
import { Toaster } from "react-hot-toast";
// Define the types for user and auth
import { User, IPost } from "@types";

type AuthContextType = {
  user: User | null;
  allUsers: User[] | null;
  userPosts: IPost[] | null;
  allPosts: IPost[] | null;

  auth: boolean;
  refresh: boolean;
  setUser: (user: User | null) => void;
  setAllUsers: (user: User[] | null) => void;
  setUserPosts: (user: IPost[] | null) => void;
  settAllPosts: (user: IPost[] | null) => void;
  setAuth: (auth: boolean) => void;
  setRefresh: (refresh: boolean) => void;
};

// Create the initial context values
const initialAuthContext: AuthContextType = {
  user: null,
  auth: false,
  refresh: false,
  allUsers: [],
  userPosts: [],
  allPosts: [],
  setAllUsers: () => {},
  setUser: () => {},
  setAuth: () => {},
  setRefresh: () => {},
  setUserPosts: () => {},
  settAllPosts: () => {},
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>(initialAuthContext);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [userPosts, setUserPosts] = useState<IPost[] | null>(null);
  const [allPosts, settAllPosts] = useState<IPost[] | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        auth,
        setUser,
        setAuth,
        allUsers,
        setAllUsers,
        refresh,
        setRefresh,
        userPosts,
        setUserPosts,
        allPosts,
        settAllPosts,
      }}
    >
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
};
