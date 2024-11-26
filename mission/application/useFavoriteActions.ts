import { useMutation, useQueryClient } from "react-query";
import { addFavorite, removeFavorite } from "../interface/favoriteApi";
import { useUserStore } from "@/user/store/useUserStore";
import { Favorite } from "../domain/Favorite";
import { Updater } from "react-query/types/core/utils";
import { useApi } from "@/common/context/ApiContext";

export const useFavoriteActions = () => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const { client } = useApi();

  const onSuccess = (action: "add" | "remove") => (fav: Favorite) => {
    queryClient.setQueryData(["mission", fav.mission_id], (data: Updater<any, any>) => ({
      ...data,
      favorite:
        action === "add"
          ? [...(data?.favorite || []), fav]
          : data?.favorite?.filter((f: Favorite) => f.user_id !== user?.id),
    }));
    queryClient.invalidateQueries(["favoriteMissions"]);
    queryClient.invalidateQueries(["missions"]); // TODO URGENT: Fix this
  };

  const addFavoriteMutation = useMutation({
    mutationFn: (missionId: number) =>
      addFavorite(client)({ user_id: user?.id as string, mission_id: missionId }),
    onSuccess: onSuccess("add"),
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: (missionId: number) =>
      removeFavorite(client)({ user_id: user?.id as string, mission_id: missionId }),
    onSuccess: onSuccess("remove"),
  });

  const isLoading = addFavoriteMutation.isLoading || removeFavoriteMutation.isLoading;

  return {
    isLoading,
    addFavorite: addFavoriteMutation.mutate,
    removeFavorite: removeFavoriteMutation.mutate,
  };
};
