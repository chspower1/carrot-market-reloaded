import { NextResponse } from "next/server";

export const GET = () => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_url: "http://localhost:3000/login/github/complete",
    scope: "read:user,user:email",
  }).toString();

  return NextResponse.redirect(`${baseUrl}?${params}`);
};
