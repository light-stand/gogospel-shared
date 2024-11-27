import { MaterialIconType } from "@/components/ui";
import colors from "tailwindcss/colors";

type CategoryValues =
  | "individual"
  | "mission-spiritual"
  | "organization-community"
  | "health-wellness"
  | "media-communication"
  | "education-literature"
  | "arts-entertainment"
  | "business-science"
  | "sports";

export type MissionTypeData = {
  color: keyof typeof colors;
  icon: MaterialIconType;
  category: CategoryValues;
};

export const ministryTypes = {
  volunteer: { icon: "account", color: "green", category: "individual" },
  missionary: { icon: "earth", color: "cyan", category: "individual" },
  evangelist: { icon: "bullhorn", color: "red", category: "individual" },
  church: { icon: "church", color: "blue", category: "mission-spiritual" },
  association: { icon: "account-group", color: "green", category: "organization-community" },
  foundation: { icon: "domain", color: "teal", category: "organization-community" },
  ngo: { icon: "charity", color: "purple", category: "organization-community" },
  ministry: { icon: "cross", color: "red", category: "mission-spiritual" },
  rehab: { icon: "hospital", color: "orange", category: "health-wellness" },
  media: { icon: "radio", color: "amber", category: "media-communication" },
  "mission-agency": { icon: "earth", color: "cyan", category: "mission-spiritual" },
  fraternity: { icon: "account-multiple", color: "pink", category: "organization-community" },
  denomination: { icon: "church", color: "blue", category: "mission-spiritual" },
  organization: { icon: "domain", color: "red", category: "organization-community" },
  bookstore: { icon: "book-open", color: "amber", category: "education-literature" },
  "record-label": { icon: "music-note", color: "purple", category: "arts-entertainment" },
  business: { icon: "storefront", color: "blue", category: "business-science" },
  "school-university": { icon: "school", color: "indigo", category: "education-literature" },
  seminary: { icon: "library", color: "orange", category: "education-literature" },
  sports: { icon: "soccer", color: "lime", category: "sports" },
} as const;

export type MinistryType = keyof typeof ministryTypes;

const missionTypeArray: MissionTypeData[] = Object.values(ministryTypes);
