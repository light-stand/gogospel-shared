export const missionListTypes = ["myMissions", "favorites", "involved"] as const;

export const listTypesIcons: Record<MissionListTypes, string> = {
  myMissions: "account",
  favorites: "heart",
  involved: "handshake",
} as const;

export type MissionListTypes = (typeof missionListTypes)[number];
