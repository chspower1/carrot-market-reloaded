import db from "./db";
import bcrypt from "bcrypt";

export const createUser = async (data: {
  username: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}) => {
  const { email, password, username } = data;
  const user = await db.user.create({
    data: {
      username,
      email,
      password: await hashedPassword(password),
    },
    select: {
      id: true,
    },
  });
  return user;
};

export const isUsernameUnique = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !user;
};
export const isEmailUnique = async (email: string) => {
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
export const findUser = async (userId: number) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};
const hashedPassword = async (password: string) => await bcrypt.hash(password, 10);
