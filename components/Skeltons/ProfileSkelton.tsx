import React from "react";

const ProfileSkelton = () => {
  return (
    <div className="my-8">
      <div className="w-full h-48 bg-neutral-500 animate-pulse">
        <div className="flex justify-between items-end absolute top-[230px]">
          <div className="h-36 w-36 border-[1px] border-sky-500 rounded-full bg-neutral-500"></div>
          <div className="h-12 w-28 rounded-full bg-neutral-500 animate-pulse ml-72"></div>
        </div>
      </div>
      <div className="mt-28 mx-4">
        <div className="h-6 w-32 my-2 lg:w-48 bg-neutral-500 animate-pulse rounded-md"></div>
        <div className="h-6 w-24 my-2 lg:w-36 bg-neutral-500 animate-pulse rounded-md"></div>
        <div className="h-3 w-36 mt-10 lg:w-72 bg-neutral-500 animate-pulse rounded-md"></div>
        <div className="h-3 w-32 my-2 lg:w-60 bg-neutral-500 animate-pulse rounded-md"></div>
      </div>
      <div className="flex mx-4 my-10">
        <div className="h-3 w-24 my-2 lg:w-36 mx-2 bg-neutral-500 animate-pulse rounded-md"></div>
        <div className="h-3 w-24 my-2 lg:w-36 mx-2 bg-neutral-500 animate-pulse rounded-md"></div>
      </div>
    </div>
  );
};

export default ProfileSkelton;
