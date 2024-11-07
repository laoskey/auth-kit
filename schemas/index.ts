import { z } from "zod";

export const SettingSchema = z.object({
  name: z.optional(z.string()),
});
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
