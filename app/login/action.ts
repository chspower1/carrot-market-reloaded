"use server";

import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { findUser } from "@/lib/auth";

const loginSchema = z
  .object({
    email: z.string().trim().email("Invalid email"),
    password: z.string(),
    // .refine(
    //   (password) => validator.isStrongPassword(password),
    //   "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number"
    // ),
  })
  .superRefine(async ({ email, password }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    if (!user) {
      return ctx.addIssue({
        code: "custom",
        message: "This email is not registerd",
        path: ["email"],
      });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password ?? "");

    // guard
    if (!isCorrectPassword) {
      return ctx.addIssue({
        code: "custom",
        message: "It's not correct password",
        path: ["password"],
      });
    }
  });

export const loginAction = async (prevState: any, formData: FormData) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // login data
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // validation
    const result = await loginSchema.safeParseAsync(data);

    // gaurd
    if (!result.success) {
      return result.error.flatten();
    }

    // login
    const user = await findUser({ type: "email", value: result.data.email });
    if (!user) return;
    const { id, email, username } = user;
    const token = jwt.sign({ id, email, username }, process.env.SECRET_KEY!);
    console.log(token);
  } catch (err) {
    console.log(err);
  }

  redirect("/profile");
};
