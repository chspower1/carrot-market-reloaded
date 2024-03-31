"use client";
import { BackspaceIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/navigation";
import React from "react";

const BackspaceButton = () => {
  const router = useRouter();
  return (
    <button className="absolute right-3 bottom-5" onClick={() => router.back()}>
      <BackspaceIcon className="w-4 h-4"></BackspaceIcon>
    </button>
  );
};

export default BackspaceButton;
