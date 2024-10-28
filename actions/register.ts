"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateField = RegisterSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "invalid fields",
    };
  }
  return { success: "Account created" };
};
