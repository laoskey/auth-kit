"use server";

import { LoginSchema } from "@/schemas";
import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);

  const validateField = LoginSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "invalid fields",
    };
  }
  return { success: "Email sent" };
  //   revalidatePath();
  //   revalidateTag();
};
