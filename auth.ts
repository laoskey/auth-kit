import NextAuth from "next-auth";
// import GitHub from "next-auth/providers/github";
// import Google from "next-auth/providers/google";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  //   providers: [GitHub, Google],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
