"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcrypt";
const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const registerSchema = z
  .object({
    username: z.string().trim().toLowerCase().min(3, "Username must be at least 3 characters"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email")
      .refine(checkUniqueEmail, "This email is duplicated!"),
    password: z.string(),
    // .min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

export async function registerAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("password-confirm"),
  };

  const result = await registerSchema.safeParseAsync(data);

  // guard
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }

  const { email, password, username: name } = result.data;
  try {
    // create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
      },
    });
    console.log("success! ", user);
  } catch (err) {
    console.log(err);
  }
  redirect(`/`);
}
