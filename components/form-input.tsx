import React, { InputHTMLAttributes } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  errorMessage: string;
}

function FormInput({ type, placeholder, errorMessage }: InputProps) {
  return (
    <div className="w-full relative mb-4">
      <input type={type} placeholder={placeholder} className="input input-bordered  w-full h-10" />
      <span className="text-red-500 absolute right-0 -bottom-4 text-sm">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
