import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
import crypt from "crypto";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordTokenByEmail } from "@/data/password-reset-token";
import { getTwoFacctorTokenByEmail } from "@/data/two-factor-token";

export const generateVerificationToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existngToken = await getVerificationTokenByEmail(email);

  if (existngToken) {
    await db.verificationToken.delete({
      where: {
        id: existngToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: { email, token, expires },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidV4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existngToken = await getPasswordTokenByEmail(email);

  if (existngToken) {
    await db.passwordResetToken.delete({
      where: { id: existngToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypt.randomInt(100_000, 1_000_000).toString();
  // TDDO:Later change to 15 minutes
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existngToken = await getTwoFacctorTokenByEmail(email);

  if (existngToken) {
    await db.twoFactorToken.delete({
      where: { id: existngToken.id },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};
