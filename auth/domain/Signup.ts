import * as z from "zod";
import { password } from "@/utils/regex";

export const signupSchema = z
  .object({
    email: z.string().email(),
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

export type SignupFields = z.infer<typeof signupSchema>;
