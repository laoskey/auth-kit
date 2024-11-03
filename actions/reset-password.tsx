"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  //

  const validateFields = ResetSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }
  // TODO:Generate token & send email
  return { success: "Reset email sent" };
};
