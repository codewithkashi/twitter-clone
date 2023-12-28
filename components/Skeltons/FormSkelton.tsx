import React from "react";

const FormSkelton = () => {
  return (
    <div className="p-4">
      <div className="flex flex-row gap-2">
        <div className="h-14 w-14 rounded-full bg-neutral-500"></div>
        <div className="w-28 md:w-48 h-4 bg-neutral-500 animate-pulse rounded-md my-2"></div>
      </div>
      <div className="flex justify-between mt-8 items-center">
        <div className="w-32 md:w-48 h-1 bg-neutral-500 animate-pulse rounded-md my-2"></div>
        <div className="h-10 w-24 bg-neutral-500 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
};

export default FormSkelton;
