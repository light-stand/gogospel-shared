import { t } from "i18next";
import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().min(6, t("user.verificationCode.errors.invalid")),
});

export type VerifyCode = z.infer<typeof verifyCodeSchema>;
