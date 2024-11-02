import { MissionType } from "./MissionType";
import { Favorite } from "./Favorite";
import { UserProfile } from "@/user/domain/User";

export type Mission = {
  id: number;
  title: string;
  description: string;
  start_date?: Date | null;
  end_date?: string;
  images?: string[];
  location?: string;
  user_profile?: UserProfile;
  created_by?: string;
  categories: MissionType[];
  duration?: number | null;
  distance?: number;
  lat?: number;
  long?: number;
  location_name?: string;
  country?: string;
  active?: boolean;
  approved?: boolean;
  favorite?: Favorite | Favorite[];
};

export type MissionViewInput = {
  min_lat: number;
  min_long: number;
  max_lat: number;
  max_long: number;
};
