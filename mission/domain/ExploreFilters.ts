import * as z from "zod";
import { MissionType, missionTypes } from "./MissionType";
import { MinistryType, ministryTypes } from "@/user/domain/MinistryType";

export const exploreFiltersSchema = z.object({
  interests: z
    .array(z.enum(Object.keys(missionTypes) as [MissionType, ...MissionType[]]))
    .optional(),
  ministryType: z
    .array(z.enum(Object.keys(ministryTypes) as [MinistryType, ...MinistryType[]]))
    .optional(),
  distance: z.number().optional(),
});

export type ExploreFilters = z.infer<typeof exploreFiltersSchema>;

export type ExploreFiltersInput = ExploreFilters & { lat: number; long: number };
