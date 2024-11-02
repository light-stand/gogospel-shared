import * as z from "zod";
import { t } from "i18next";
import dayjs from "dayjs";

import { MissionType, missionTypes } from "@/mission/domain/MissionType";

export const missionCreationFlow = [
  "index",
  "details",
  "duration",
  "category",
  "location",
  "image",
  "summary",
] as const;

export const fieldsByScreen = {
  index: [],
  details: ["title", "description"],
  duration: ["startDate", "duration", "durationMultiplier"],
  category: ["categories"],
  location: ["location"],
  image: ["image"],
  summary: [],
} as const;

export type MissionCreationScreen = (typeof missionCreationFlow)[number];

const langPrefix = "mission.creation.error";

export const missionCreationSchema = z
  .object({
    title: z.string().min(3, t(`${langPrefix}.title`)),
    description: z.string().min(60, t(`${langPrefix}.description`)),
    startDate: z
      .date({ message: t(`${langPrefix}.startDate`) })
      .min(new Date(), t(`${langPrefix}.startDateAfterToday`))
      .optional(),
    duration: z
      .number()
      .min(1, t(`${langPrefix}.duration`))
      .optional(),
    durationMultiplier: z.number({ message: t(`${langPrefix}.durationMultiplier`) }),
    noDuration: z.boolean().optional(),
    noStartDate: z.boolean().optional(),
    categories: z
      .array(
        z.enum(Object.keys(missionTypes) as [MissionType, ...MissionType[]], {
          message: t(`profiling.fields.interests.error`),
        })
      )
      .min(4, t(`${langPrefix}.categories`))
      .max(10, t(`${langPrefix}.categories`)),
    location: z.object(
      {
        latitude: z.number(),
        longitude: z.number(),
        locationName: z.string(),
        country: z.string(),
      },
      { message: t(`${langPrefix}.location`) }
    ),
    image: z.string().optional(),
  })
  .refine(
    ({ noDuration, duration }) =>
      noDuration ||
      z
        .number()
        .min(1, t(`${langPrefix}.duration`))
        .optional()
        .parse(duration),
    {
      path: ["duration"],
    }
  )
  .refine(
    ({ noStartDate, startDate }) => noStartDate || dayjs(startDate).isAfter(new Date(), "day"),
    { path: ["startDate"] }
  );

export type MissionCreationFields = z.infer<typeof missionCreationSchema>;
