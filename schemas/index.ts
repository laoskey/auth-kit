import { newPassword } from "@/actions/new-password";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export const SettingSchema = z
  .object({
    name: z.optional(z.string()),
    // isTwoFactorEnabled: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      // if (data.newPassword && !data.password) {
      //   return false;
      // }
      return true;
    },
    { message: "New password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    { message: " password is required", path: ["password"] }
  )
  .refine(
    // Fixed: fixed the bug that user can update userName by "".
    (data) => {
      if (!data.name || !data.email) {
        return false;
      }
      return true;
    },
    { message: "name not be ''", path: ["name", "email"] }
  );
export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
  code: z.optional(z.string()),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "minium 6 characters ",
  }),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email is required",
  }),

  password: z.string().min(6, {
    message: "minium 6 characters ",
  }),
  name: z.string().min(3, {
    message: "name is required",
  }),
});
