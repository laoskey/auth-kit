"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGGIN_REDIRECT } from "@/routes";

export const loginGithub = async () => {
  try {
    await signIn("github");
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
