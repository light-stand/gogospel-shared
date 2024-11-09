import { Repository } from "@/interface/repository";
import { UserProfile } from "../domain/User";
import { SupabaseClient } from "@supabase/supabase-js";

export class UserProfileRepository extends Repository<UserProfile> {
  constructor(client: SupabaseClient) {
    super("user_profile", client);
  }
}
