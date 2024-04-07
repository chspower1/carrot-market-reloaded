"use client";
import Image from "next/image";
import { useState } from "react";
import Input from "../../components/form-input";
import Link from "next/link";
import "@/lib/db";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <h1 className="text-4xl font-bold">HS 마켓</h1>
        <span>환영합니다!</span>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <Link href={"/create-account"} className="w-full btn btn-active btn-accent">
          시작하기
        </Link>
        <div className="flex gap-2">
          <span>계정이 있으신가요?</span>
          <Link href="/login" className="hover:underline underline-offset-4">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
