import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByToken = async (
  email: string,
  token: string
) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { email_token: { email, token } },
      // where: { token } },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
