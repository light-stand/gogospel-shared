import { useState } from "react";
import { useQuery } from "react-query";

import { useUserStore } from "@/user/store/useUserStore";
import { MissionListTypes } from "../domain/MissionListType";
import { SupabaseFilter } from "@/interface/repository";
import { useApi } from "@/common/context/ApiContext";

export const useListMissions = () => {
  const { repo } = useApi();
  const { user } = useUserStore();
  const [mode, setMode] = useState<MissionListTypes>("myMissions");

  const listMissionFilters = {
    myMissions: [
      ["active", "eq", true],
      ["created_by", "eq", user?.id],
    ],
    favorites: [
      ["approved", "eq", true],
      ["active", "eq", true],
      ["favorite.user_id", "eq", user?.id],
    ],
    involved: [
      ["approved", "eq", true],
      ["active", "eq", true],
      ["connection.user1_id", "eq", user?.id],
    ],
  }[mode];

  const select = `*, user_profile!created_by(name, images),${
    mode === "involved" ? "connection!inner(*)" : "connection(*)"
  }, ${mode === "favorites" ? "favorite!inner(*)" : "favorite(*)"}`;

  const query = useQuery({
    queryKey: ["listMissions", mode],
    queryFn: () =>
      repo?.mission.get(listMissionFilters as SupabaseFilter | SupabaseFilter[], select),
  });

  return { query, mode, setMode };
};
