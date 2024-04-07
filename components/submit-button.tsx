"use client";
import clsx from "clsx";
import React from "react";
import { useFormStatus } from "react-dom";
interface SubmitButtonProps {
  children: React.ReactNode;
}
export default function SubmitButton({ children }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={clsx("btn btn-accent w-full")} disabled={pending}>
      {children}
    </button>
  );
}
