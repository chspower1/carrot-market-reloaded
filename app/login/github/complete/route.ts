import { findUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// getAccessToken
const getAccessToken = async (code: string) => {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenUrl = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessToken = await (
    await fetch(accessTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("error" in accessToken) {
    throw new Error("error in accessToken");
  }
  return accessToken.access_token;
};
// getUser
const getUser = async (accessToken: string) => {
  const user = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).json();

  return user;
};

// GET
export const GET = async (req: NextRequest) => {
  try {
    const code = req.nextUrl.searchParams.get("code");

    // guard;
    if (!code) {
      throw new Error("code is not exist!");
    }

    const accessToken = await getAccessToken(code);
    const user = await getUser(accessToken);
    
  
    return NextResponse.json(user);
  } catch (err) {
    // TODO: Login Error page로 대체하기
    console.log(err);
    return new NextResponse(null, {
      status: 400,
    });
  }
};
