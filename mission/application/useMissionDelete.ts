import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "react-query";

import { missionRepository } from "../interface/missionRepository";
import { queryClient } from "@/interface/queryClient";

export const useMissionDelete = () => {
  const id = parseInt(useLocalSearchParams().id as string);
  const router = useRouter();

  const onSuccess = () => {
    queryClient.invalidateQueries(["listMissions", "myMissions"]);
    router.push("/missions");
  };

  const { mutateAsync: updateMission, isLoading } = useMutation(missionRepository.update, {
    onSuccess,
  });

  const onDelete = async () => {
    updateMission({
      id,
      active: false,
    });
  };

  return { onDelete, isLoading };
};
