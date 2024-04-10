import { IronSession, getIronSession } from "iron-session";
import { cookies } from "next/headers";

export const getSession = () => {
  const session = getIronSession<{ id?: number }>(cookies(), {
    cookieName: "iron-session",
    password: process.env.SECRET_KEY!,
  });
  return session;
};
export const saveSession = (
  session: IronSession<{
    id?: number;
  }>,
  id: number
) => {
  session.id = id;
  session.save();
};
