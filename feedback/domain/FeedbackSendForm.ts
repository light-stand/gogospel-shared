import * as z from "zod";
import { t } from "i18next";

export const feedbackCreationSchema = z.object({
  title: z.string().min(3, t("feedback.creation.errors.title")),
  description: z.string().min(40, t("feedback.creation.errors.description")),
});

export type FeedbackCreationFields = z.infer<typeof feedbackCreationSchema>;
