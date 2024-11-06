"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
// import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/lib/tokens";
import { existsSync } from "fs";
import {
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "@/lib/mail";
import { getTwoFacctorTokenByEmail } from "@/data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateField = LoginSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "invalid fields",
    };
  }

  const { email, password, code } = validateField.data!;
  const exsitingUser = await getUserByEmail(email);
  // console.log(exsitingUser);
  if (
    !exsitingUser ||
    !exsitingUser.email ||
    !exsitingUser.password
  ) {
    return {
      error: "Invalid credentials:Email or password not exist!",
    };
  }
  if (!exsitingUser.emailVerified) {
    const verficationToken = await generateVerificationToken(
      exsitingUser.email
    );
    await sendVerificationEmail(
      verficationToken.email,
      verficationToken.token
    );
    return { success: "Confirmation email sent " };
  }

  if (exsitingUser.isTwoFactorEnabled && exsitingUser.email) {
    if (code) {
      // TODO :Verify code
      const twoFactorToken = await getTwoFacctorTokenByEmail(
        exsitingUser.email
      );
      if (!twoFactorToken) {
        return { error: "Invalid code" };
      }
      if (twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }
      const hasExpired =
        new Date(twoFactorToken.expires) < new Date();
      if (hasExpired) {
        return { error: "Code expired" };
      }

      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation =
        await getTwoFactorConfirmationByUserId(exsitingUser.id);

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: exsitingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(
        exsitingUser.email
      );
      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      );
      return { twoFactor: true };
    }
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
