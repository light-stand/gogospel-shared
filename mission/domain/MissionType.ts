import { MaterialIconType } from "@/components/ui/foundation/Icon/Icon";
import colors from "tailwindcss/colors";
import { t } from "i18next";

type CategoryValues =
  | "mission-spiritual"
  | "poverty-justice"
  | "business-science"
  | "children-family"
  | "arts-media";

export type MissionTypeData = {
  color: keyof typeof colors;
  icon: MaterialIconType;
  category: CategoryValues;
};

export const missionTypes = {
  adventure: { icon: "hiking", color: "indigo", category: "mission-spiritual" },
  "anti-trafficking": { icon: "gavel", color: "red", category: "poverty-justice" },
  bible: { icon: "book", color: "yellow", category: "mission-spiritual" },
  business: { icon: "briefcase", color: "blue", category: "business-science" },
  "children-and-youth": { icon: "human-child", color: "green", category: "children-family" },
  "children-at-risk": { icon: "baby-face-outline", color: "pink", category: "children-family" },
  cinematography: { icon: "video", color: "purple", category: "arts-media" },
  compassion: { icon: "hand-heart", color: "teal", category: "poverty-justice" },
  "community-development": { icon: "city", color: "cyan", category: "poverty-justice" },
  counseling: { icon: "head-heart", color: "orange", category: "children-family" },
  culture: { icon: "earth", color: "lime", category: "mission-spiritual" },
  design: { icon: "pencil-ruler", color: "fuchsia", category: "arts-media" },
  evangelism: { icon: "bullhorn", color: "rose", category: "mission-spiritual" },
  family: { icon: "account-group", color: "amber", category: "children-family" },
  "fine-arts": { icon: "palette", color: "emerald", category: "arts-media" },
  frontiers: { icon: "compass", color: "violet", category: "mission-spiritual" },
  healthcare: { icon: "hospital", color: "red", category: "children-family" },
  leadership: { icon: "account-tie", color: "orange", category: "mission-spiritual" },
  media: { icon: "television", color: "sky", category: "arts-media" },
  music: { icon: "music", color: "teal", category: "arts-media" },
  "performing-arts": { icon: "drama-masks", color: "indigo", category: "arts-media" },
  photography: { icon: "camera", color: "blue", category: "arts-media" },
  "poor-and-marginalized": { icon: "hand-coin", color: "yellow", category: "poverty-justice" },
  reconciliation: { icon: "handshake", color: "green", category: "poverty-justice" },
  refugees: { icon: "human-male-female", color: "pink", category: "poverty-justice" },
  revival: { icon: "flare", color: "purple", category: "mission-spiritual" },
  science: { icon: "flask", color: "teal", category: "business-science" },
  "social-justice": { icon: "scale-balance", color: "cyan", category: "poverty-justice" },
  "spiritual-growth": { icon: "leaf", color: "orange", category: "mission-spiritual" },
  sports: { icon: "soccer", color: "lime", category: "mission-spiritual" },
  teaching: { icon: "school", color: "fuchsia", category: "children-family" },
  technology: { icon: "laptop", color: "rose", category: "business-science" },
  "the-unreached": { icon: "earth", color: "amber", category: "mission-spiritual" },
  urban: { icon: "city-variant", color: "emerald", category: "mission-spiritual" },
  writing: { icon: "pencil", color: "violet", category: "arts-media" },
  worship: { icon: "music", color: "lime", category: "mission-spiritual" },
} as const;

export type MissionType = keyof typeof missionTypes;

export const missionTypesWithLocale = Object.entries(missionTypes).map(([key, value]) => ({
  ...value,
  value: key,
  label: t(`mission.types.${key}`),
}));

// This is a type checker of all the values in the missionTypes object
const missionTypeArray: MissionTypeData[] = Object.values(missionTypes);
