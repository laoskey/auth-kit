"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
export const newVerification = async (token: string) => {
  const existngToken = await getVerificationTokenByToken(token);
  if (!existngToken) {
    return { error: "Token does not exsit" };
  }

  const hasExpired = new Date(existngToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const exsitingUser = await getUserByEmail(existngToken.email);
  if (!exsitingUser) {
    return { error: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: exsitingUser.id },
    data: {
      emailVerified: new Date(),
      email: existngToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existngToken.id },
  });

  return { success: "Email verified" };
};
