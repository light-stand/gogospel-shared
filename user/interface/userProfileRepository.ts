import { Repository } from "@/interface/repository";
import { supabase } from "@/interface/supabase";
import { UserProfile } from "../domain/User";

export const userProfileRepository = new Repository<UserProfile>("user_profile", supabase);
