import { db } from "@/lib/db";

export const getTwoFacctorTokenByToken = async (token: string) => {
  try {
    const twoFctorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });
    return twoFctorToken;
  } catch {
    return null;
  }
};
export const getTwoFacctorTokenByEmail = async (email: string) => {
  try {
    const twoFctorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFctorToken;
  } catch {
    return null;
  }
};
