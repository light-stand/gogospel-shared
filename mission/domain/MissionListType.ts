export const missionListTypes = ["myMissions", "favorites", "involved"] as const;

export type MissionListTypes = (typeof missionListTypes)[number];
