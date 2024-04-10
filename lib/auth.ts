import db from "./db";
import bcrypt from "bcrypt";

export const checkUniqueEmail = async (email: string) => {
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

export const hashedPassword = async (password: string) => await bcrypt.hash(password, 10);
