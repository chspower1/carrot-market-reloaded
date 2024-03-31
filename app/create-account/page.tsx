import FormInput from "@/components/form-input";
import { BackspaceIcon, ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import React from "react";

function CreateAccount() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <div className=" text-4xl font-bold mb-10">Sign Up</div>
      <FormInput type="text" placeholder="Email" errorMessage="" />
      <FormInput type="password" placeholder="Password" errorMessage="" />
      <FormInput type="password" placeholder="Password Confirm" errorMessage="" />
      <button className="btn btn-accent w-full">Create Account</button>
      <div className="w-full h-px bg-gray-600 my-5"></div>
      <button className="btn btn-accent w-full">
        <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
        Sign up with SMS
      </button>
    
    </div>
  );
}

export default CreateAccount;
