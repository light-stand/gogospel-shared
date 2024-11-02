import { Favorite } from "../domain/Favorite";
import { supabase } from "@/interface/supabase";

export const addFavorite = async (favorite: Favorite): Promise<Favorite> => {
  const { error, data } = await supabase
    .from("favorite")
    .insert(favorite as any)
    .select("*")
    .single();
  if (error) throw error;
  return data;
};

export const removeFavorite = async (favorite: Favorite): Promise<Favorite> => {
  const { error, data } = await supabase
    .from("favorite")
    .delete()
    .eq("user_id", favorite.user_id)
    .eq("mission_id", favorite.mission_id)
    .select("*")
    .single();

  if (error) throw error;
  return data;
};
