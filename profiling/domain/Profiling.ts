import { ProfilingFields } from "./ProfilingForm";

export type ProfilingScreen = "name" | "bio" | "picture" | "interests";

export type ProfilingField = keyof ProfilingFields;

export const profilingFlow: ProfilingScreen[] = ["name", "bio", "picture", "interests"];

export const fieldsByScreen: {
  [key: string]: ProfilingField[];
} = {
  name: ["name", "ministryType"],
  bio: ["bio"],
  picture: ["picture"],
  interests: ["interests"],
};
