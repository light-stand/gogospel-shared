import { useState } from "react";
import { useQuery } from "react-query";

import { useUserStore } from "@/user/store/useUserStore";
import { MissionListTypes } from "../domain/MissionListType";
import { useApi } from "@/common/context/ApiContext";

export const useListMissions = () => {
  const { repo } = useApi();
  const { user } = useUserStore();
  const [mode, setMode] = useState<MissionListTypes>("myMissions");

  const query = useQuery({
    queryKey: ["listMissions", mode],
    queryFn: () => repo?.mission.list(mode, user.id as string),
  });

  return { query, mode, setMode };
};
