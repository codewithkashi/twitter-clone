"use client";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageUploadProps } from "@types";
import Image from "next/image";
const ImageUpload = ({
  label,
  onChange,
  disabled,
  value,
}: ImageUploadProps) => {
  const [base64, setBase64] = useState(value);
  const handleChange = (base64: string) => {
    onChange(base64);
  };

  const handleDrop = (files: any) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/*": [],
      "image/png": [],
      "image/jpg": [],
    },
  });
  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
