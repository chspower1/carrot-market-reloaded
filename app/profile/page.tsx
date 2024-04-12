import { findUser } from "@/lib/auth";
import { getSession } from "@/lib/session";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";
const getUser = async () => {
  const session = await getSession();
  if (!session.id) return notFound();
  const user = await findUser({ id: session.id });
  return user;
};
export default async function ProfilePage() {
  const user = await getUser();

  return (
    <>
      <div>Hello {user?.username}</div>
      <form
        action={async () => {
          "use server";
          cookies().delete("iron-session");
        }}
      >
        <button>logout</button>
      </form>
    </>
  );
}
