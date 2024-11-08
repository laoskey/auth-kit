"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { SettingSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { update } from "@/auth";

export const settings = async (
  values: z.infer<typeof SettingSchema>
) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.newPassword = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }
    const varificationToken = await generateVerificationToken(
      values.email
    );
    await sendVerificationEmail(
      varificationToken.email,
      varificationToken.token
    );
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  const updpateUser = await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  // Update session from the server side
  update({
    user: {
      name: updpateUser.name,
      email: updpateUser.email,
      isTwoFactorEnabled: updpateUser.isTwoFactorEnabled,
      role: updpateUser.role,
    },
  });
  return { success: "Settings updated" };
};
