import { Favorite } from "../domain/Favorite";
import { ApiConnection } from "@/common/interface/api";

export const addFavorite =
  (client: ApiConnection["client"]) =>
  async (favorite: Favorite): Promise<Favorite> => {
    const { error, data } = await client
      .from("favorite")
      .insert(favorite as any)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  };

export const removeFavorite =
  (client: ApiConnection["client"]) =>
  async (favorite: Favorite): Promise<Favorite> => {
    const { error, data } = await client
      .from("favorite")
      .delete()
      .eq("user_id", favorite.user_id)
      .eq("mission_id", favorite.mission_id)
      .select("*")
      .single();

    if (error) throw error;
    return data;
  };
