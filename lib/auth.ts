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

interface FindUserProps {
  type: "id" | "username" | "email";
  value: number | string;
}
export const findUser = async ({ type, value }: FindUserProps) => {
  let user;
  if (type === "id") {
    user = await db.user.findUnique({
      where: {
        id: value as number,
      },
    });
  }
  if (type === "email") {
    user = await db.user.findUnique({
      where: {
        email: value as string,
      },
    });
  }
  if (type === "username") {
    user = await db.user.findUnique({
      where: {
        username: value as string,
      },
    });
  }

  return user ?? null;
};
const hashedPassword = async (password: string) => await bcrypt.hash(password, 10);
