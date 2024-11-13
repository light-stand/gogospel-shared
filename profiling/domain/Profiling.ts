import { ProfilingFields } from "./ProfilingForm";

// Mobile

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

// Desktop

export enum Step {
  Welcome,
  FormA,
  FormB,
}

export const fieldsByStep: { [step in Step]: ProfilingField[] } = {
  [Step.Welcome]: [],
  [Step.FormA]: ["name", "bio", "ministryType"],
  [Step.FormB]: ["interests", "picture"],
};
