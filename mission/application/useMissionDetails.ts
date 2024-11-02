import { useEffect } from "react";
import { useQuery } from "react-query";

import { getLocation } from "@/maps/interface/mapsService";
import { haversineDistance } from "@/maps/utils/distance";
import { missionRepository } from "@/mission/interface/missionRepository";
import { useUserStore } from "@/user/store/useUserStore";
import { queryClient } from "@/interface/queryClient";

export const useMissionDetails = (id: number) => {
  const { user } = useUserStore();

  const { data: mission, isLoading } = useQuery({
    queryKey: ["mission", id],
    queryFn: () =>
      missionRepository.getById(
        id,
        "*, user_profile!created_by(user_id, name, images), favorite(user_id)"
      ),
  });

  const getMissionDistance = async () => {
    const userLocation = await getLocation();
    if (!userLocation || !mission?.lat || !mission?.long) return;
    const distance = haversineDistance(
      userLocation?.latitude,
      userLocation?.longitude,
      mission.lat,
      mission.long
    );
    mission.distance = Math.floor(distance);
    queryClient.setQueryData(["mission", id], mission);
  };

  useEffect(() => {
    getMissionDistance();
  }, [mission]);

  // Thanks to RLS, "favorite" should contain only the user entry
  const isFavorite =
    Array.isArray(mission?.favorite) && mission.favorite.some((fav) => fav.user_id === user?.id);

  return { mission, isLoading, isFavorite };
};
