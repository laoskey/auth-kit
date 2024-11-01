"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
// import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { existsSync } from "fs";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "invalid fields",
    };
  }

  const { email, password } = validateField.data!;
  const exsitingUser = await getUserByEmail(email);
  console.log(exsitingUser);
  if (!exsitingUser || !exsitingUser.email || !exsitingUser.password) {
    return { error: "Invalid credentials:Email or password not exist!" };
  }
  if (!exsitingUser.emailVerified) {
    const verficationToken = await generateVerificationToken(
      exsitingUser.email
    );

    return { success: "Confirmation email sent " };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
    /*
   revalidatePath();
  revalidateTag();
  */
  }
};
