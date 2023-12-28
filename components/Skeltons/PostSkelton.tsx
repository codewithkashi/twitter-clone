import React from "react";

const PostSkelton = () => {
  return (
    <div className="my-4 mx-2 border-b-[1px] border-neutral-500">
      <div className="flex my-2">
        <div className="h-12 w-12 animate-pulse rounded-full bg-neutral-500"></div>
        <div className="w-32 h-4 bg-neutral-500 animate-pulse ml-2 rounded-md"></div>
        <div className="hidden lg:block w-24 h-4 bg-neutral-500 animate-pulse ml-2 rounded-md"></div>
      </div>
      <div className="w-36 h-4 bg-neutral-500 animate-pulse ml-2 rounded-md"></div>
      <div className="w-48 lg:w-[400px] my-2 h-4 bg-neutral-500 animate-pulse ml-2 rounded-md"></div>
      <div className="w-32 lg:w-[330px] my-2 h-4 bg-neutral-500 animate-pulse ml-2 rounded-md"></div>
    </div>
  );
};

export default PostSkelton;
