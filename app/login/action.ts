"use server";

import { checkUniqueEmail, hashedPassword } from "@/lib/auth";
import db from "@/lib/db";
import validator from "validator";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getSession, saveSession } from "@/lib/session";
import { redirect } from "next/navigation";
const checkExistEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").refine(checkExistEmail, "Can't not find Email"),
  password: z.string(),
  // .refine(
  //   (password) => validator.isStrongPassword(password),
  //   "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number"
  // ),
});

export const loginAction = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // login data
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await loginSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const { email, password } = result.data;
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    // guard
    if (!user) {
      return {
        fieldErrors: {
          password: ["can't find user"],
          email: [],
        },
      };
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password ?? "");

    // guard
    if (!isCorrectPassword) {
      return {
        fieldErrors: {
          password: ["It's not correct password"],
          email: [],
        },
      };
    }

    // login
    const session = await getSession();
    saveSession(session, user.id);
    redirect("/profile");
  }
};
