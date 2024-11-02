import { Mission } from "../domain/Mission";

export const checkIsFavorite = (mission: Mission, userId?: string) => {
  if (!userId || !mission?.favorite) return false;
  if (Array.isArray(mission?.favorite))
    return mission.favorite.some((fav) => fav.user_id === userId);
  if (typeof mission?.favorite === "object")
    return Object.values(mission?.favorite).some((fav) => fav === userId);
  return false;
};
