"use client";
import FormInput from "@/components/form-input";
import SubmitButton from "@/components/submit-button";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";
import { SMSForm, smsAction } from "./action";

const initialState: SMSForm = {
  phone: null,
  isSendingToken: false,
};

function SMSPage() {
  const [state, action] = useFormState(smsAction, initialState);
  return (
    <form action={action} className="flex flex-col items-center min-h-screen p-6">
      <div className=" text-4xl font-bold mb-10">SMS</div>
      <FormInput
        type="text"
        placeholder="Phone Number"
        name="phone"
        hidden={state?.isSendingToken}
        errorMessages={state.isSendingToken ? [] : state?.errors}
      />
      {state.phone && state?.isSendingToken && (
        <>
          <FormInput
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={state.phone}
            disabled={state?.isSendingToken}
          />
          <FormInput type="number" placeholder="Token" name="token" errorMessages={state?.errors} />
        </>
      )}
      <SubmitButton>{state.isSendingToken ? "Verify" : "Send Token"}</SubmitButton>
      <div className="w-full h-px bg-gray-600 my-5"></div>
      <div className="flex flex-col gap-3 w-full">
        <Link className="btn btn-accent w-full" href="/login">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
          Log in
        </Link>
        <Link className="btn btn-accent w-full" href="/create-account">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5" />
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default SMSPage;
