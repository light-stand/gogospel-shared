import { SupabaseClient } from "@supabase/supabase-js";
import { Repository } from "@/interface/repository";
import { Mission, MissionViewInput } from "../domain/Mission";
import { ExploreFiltersInput } from "../domain/ExploreFilters";

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
}
