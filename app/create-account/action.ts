"use server";

import { RedirectType, redirect } from "next/navigation";
import { z } from "zod";
import { getSession, saveSession } from "@/lib/session";
import { isEmailUnique, isUsernameUnique, createUser } from "@/lib/auth";

const registerSchema = z
  .object({
    username: z.string().trim().toLowerCase().min(3, "Username must be at least 3 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string(),
    // .min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),
  })
  // check password is the same
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  })
  // check usernaem is unique
  .superRefine(async ({ username }, ctx) => {
    if (!(await isUsernameUnique(username))) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already in used",
        fatal: true,
        path: ["username"],
      });
      return z.NEVER;
    }
  })
  // check usernaem is email
  .superRefine(async ({ email }, ctx) => {
    if (!(await isEmailUnique(email))) {
      ctx.addIssue({
        code: "custom",
        message: "This Eamil is already in used",
        fatal: true,
        path: ["email"],
      });
      return z.NEVER;
    }
  });

export async function registerAction(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  try {
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

    // create user
    const user = await createUser(result.data);

    // iron-session
    const session = await getSession();
    saveSession(session, user.id);

    // redirect
  } catch (err) {
    console.log(err);
  }
  redirect("/profile", RedirectType.push);
}
