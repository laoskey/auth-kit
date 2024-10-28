/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateField = RegisterSchema.safeParse(values);

  if (!validateField.success) {
    return {
      error: "invalid fields",
    };
  }

  const { email, password, name } = validateField.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const exsitingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (exsitingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // TODO:Sent varifacation email

  return { success: "User created" };
};
