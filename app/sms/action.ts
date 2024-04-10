import db from "@/lib/db";
import validator from "validator";
import { z } from "zod";

export interface SMSForm {
  phone: string | null;
  errors?: string[];
  isSendingToken: boolean;
}
const phoneSchema = z
  .string()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "Invalid phone number");
const tokenSchema = z.string().refine((token) => token.length === 6, "Invalid token");

export async function smsAction(prevState: SMSForm, formData: FormData) {
  const [phone, token] = [formData.get("phone") as string | null, formData.get("token")];
  console.log(phone, token);
  if (!prevState.isSendingToken) {
    const result = phoneSchema.safeParse(phone);
    if (result.success) {
      // TODO: send token
      const smsToken = db.smsToken.create({
        data: {
          token: "123123",
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: "random",
                phone: result.data,
              },
            },
          },
        },
      });
      return {
        phone,
        isSendingToken: true,
      };
    } else {
      console.log(result.error.flatten().formErrors);
      return {
        phone,
        isSendingToken: false,
        errors: result.error.flatten().formErrors,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (result.success) {
      return { phone, isSendingToken: true };
    } else {
      console.log(result.error.flatten().formErrors);
      return {
        phone,
        isSendingToken: true,
        errors: result.error.flatten().formErrors,
      };
    }
  }
}
