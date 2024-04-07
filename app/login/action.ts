"use server";

import validator from "validator";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z
    .string()
    .refine(
      (password) => validator.isStrongPassword(password),
      "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export const loginAction = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else console.log(data);
};
