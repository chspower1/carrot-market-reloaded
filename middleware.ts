import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { getSession } from "./lib/session";
console.log("middleware");

interface PublicOnlyUrl {
  [key: string]: boolean;
}

const pulicOnlyUrl: PublicOnlyUrl = {
  "/": true,
  "/login": true,
  "/login/github/start": true,
  "/login/github/complete": true,
  "/sms": true,
  "/create-account": true,
};

export const middleware: NextMiddleware = async (req, event) => {
  const session = await getSession();
  const publicOnlyPage = pulicOnlyUrl[req.nextUrl.pathname];
  if (!session.id && !publicOnlyPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }
  if (session.id && publicOnlyPage) {
    return NextResponse.redirect(new URL("/products", req.nextUrl.origin));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
