import * as z from "zod";
import { password } from "@/utils/regex";

export const resetPasswordRequestSchema = z.object({
  email: z.string().email(),
  redirectUrl: z.string().url().optional(),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().regex(password, {
      message:
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter and one number",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPassowordRequestFields = z.infer<typeof resetPasswordRequestSchema>;

export type ResetPassowordFields = z.infer<typeof resetPasswordSchema>;
