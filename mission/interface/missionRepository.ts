import { SupabaseClient } from "@supabase/supabase-js";
import { Repository, SupabaseFilter } from "@/interface/repository";

import { Mission, MissionViewInput } from "../domain/Mission";
import { ExploreFiltersInput } from "../domain/ExploreFilters";
import { MissionListTypes } from "../domain/MissionListType";

export class MissionRepository extends Repository<Mission> {
  constructor(client: SupabaseClient) {
    super("mission_view", client);
  }

  // Apply filters and location
  exploreMissions = async (input: ExploreFiltersInput): Promise<Mission[]> => {
    const { data, error } = await this.client
      .rpc("explore_missions", input)
      .select("*,user_profile!created_by(*), favorite(user_id)");
    if (error) throw error;
    return data as Mission[];
  };

  // for when we have a millions missions :)
  getMissionsOnView = async (view: MissionViewInput): Promise<Mission[]> => {
    const { data, error } = await this.client.rpc("missions_in_view", view);
    if (error) {
      console.error("Error fetching data:", error);
      throw error;
    }

    return data as Mission[];
  };

  list = async (mode: MissionListTypes, userId: string) => {
    const listMissionFilters = {
      myMissions: [["created_by", "eq", userId]],
      favorites: [
        ["approved", "eq", true],
        ["active", "eq", true],
        ["favorite.user_id", "eq", userId],
      ],
      involved: [
        ["approved", "eq", true],
        ["active", "eq", true],
        ["connection.user1_id", "eq", userId],
      ],
    }[mode] as SupabaseFilter | SupabaseFilter[];

    const select = `*, user_profile!created_by(name, images),${
      mode === "involved" ? "connection!inner(*)" : "connection(*)"
    }, ${mode === "favorites" ? "favorite!inner(*)" : "favorite(*)"}`;

    return await this.get(listMissionFilters, select);
  };
}
