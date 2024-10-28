/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}
// TIPS:Because of NEXTJS hot reload whenever we save a file NEXTJS will run a hot loard
//and that would do initialize a new PrismaClient every timme and then
// you would get some warnings in your terminal that you have too many acctive
// Prisma clients,so what we do is ading a if cause,if we are not in production ,in
// that case we're going to store the database variable inside of globalTHIS.prisma
//when the hot reload in the next iteration ,it will checcj if it has PRisma already
// initialzed in global,because the global is not affect of hot reload
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
