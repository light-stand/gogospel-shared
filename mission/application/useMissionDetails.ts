import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import { haversineDistance } from "@/maps/utils/distance";
import { useUserStore } from "@/user/store/useUserStore";
import { useApi } from "@/common/context/ApiContext";

export const useMissionDetails = (
  id: number,
  location?: { latitude: number; longitude: number }
) => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { client, repo } = useApi();

  const { data: mission, isLoading } = useQuery({
    queryKey: ["mission", id],
    queryFn: () =>
      repo?.mission.getById(
        id,
        "*, user_profile!created_by(user_id, name, images), favorite(user_id)"
      ),
    enabled: !!client,
  });

  const getMissionDistance = async () => {
    if (!location || !mission?.lat || !mission?.long) return;
    const distance = haversineDistance(
      location?.latitude,
      location?.longitude,
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
