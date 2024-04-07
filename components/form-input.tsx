import React, { InputHTMLAttributes } from "react";

interface InputProps {
  name: string;
  errorMessages?: string[];
}

function FormInput({
  errorMessages = [],
  name,
  ...attr
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full relative mb-4">
      <input name={name} className="input input-bordered  w-full h-10 text-black" {...attr} />
      <div className="flex flex-col text-red-500  text-right text-sm">
        {errorMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default FormInput;
