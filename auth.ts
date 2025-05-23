/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserID } from "./data/account";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);

    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //   return true;
    // },
    async signIn({ user, account }) {
      // 1> check allow Oauth without verfication
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id as string);
      //  2>PRevent sign in without email varification
      if (!existingUser?.emailVerified) {
        return false;
      }
      // 2>Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation =
          await getTwoFactorConfirmationByUserId(existingUser.id);
        // console.log({ twoFactorConfirmation });
        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete 2FA confirmation for the next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },

    async session({ token, session }) {
      // console.log({ token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled =
          token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token, user, profile }) {
      if (!token.sub) {
        return token;
      }
      // console.log("I'LL BE CALLED AGAIN");
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }
      const existingAccount = await getAccountByUserID(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
