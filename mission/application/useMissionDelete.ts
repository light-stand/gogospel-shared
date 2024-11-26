import { useLocalSearchParams, useRouter } from "expo-router";
import { useMutation } from "react-query";

import { queryClient } from "@/interface/queryClient";
import { useApi } from "@/common/context/ApiContext";

export const useMissionDelete = () => {
  const id = parseInt(useLocalSearchParams().id as string);
  const { repo } = useApi();
  const router = useRouter();

  const onSuccess = () => {
    queryClient.invalidateQueries(["listMissions", "myMissions"]);
    router.push("/missions");
  };

  const { mutateAsync: updateMission, isLoading } = useMutation(repo?.mission.update, {
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
