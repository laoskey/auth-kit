import { getVerificationTokenByEmail } from "@/data/verification-token";

import { v4 as uuidV4 } from "uuid";
import { db } from "./db";
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
