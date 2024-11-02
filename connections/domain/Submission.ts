import * as z from "zod";
import { t } from "i18next";

export const submissionSchema = z.object({
  message: z.string().min(40, t("connections.submission.errors.message")),
});

export type Submission = z.infer<typeof submissionSchema>;
