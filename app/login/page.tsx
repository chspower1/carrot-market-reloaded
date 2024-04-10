"use client";
import FormInput from "@/components/form-input";
import SubmitButton from "@/components/submit-button";
import { BackspaceIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import { loginAction } from "./action";

function LoginPage() {
  const [state, action] = useFormState(loginAction, null);
  return (
    <form action={action} className="flex flex-col items-center min-h-screen p-6">
      <div className=" text-4xl font-bold mb-10">Login</div>

      <FormInput
        type="text"
        placeholder="Email"
        name="email"
        errorMessages={state?.fieldErrors.email}
      />
      <FormInput
        type="password"
        placeholder="Password"
        name="password"
        errorMessages={state?.fieldErrors.password}
      />
      <SubmitButton>Login</SubmitButton>
      <div className="w-full h-px bg-gray-600 my-5"></div>
      <div className="flex flex-col gap-3 w-full">
        <Link className="btn btn-accent w-full" href="/create-account">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
          Sign up
        </Link>
        <Link className="btn btn-accent w-full" href="/sms">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
          Sign up with SMS
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
