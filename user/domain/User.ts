import { MinistryType } from "@/user/domain/MinistryType";
import { MissionType } from "@/mission/domain/MissionType";

export type User = {
  id?: string;
  email?: string;
};

export type UserProfile = {
  id: number;
  user_id: string;
  name: string;
  description: string;
  lat?: number;
  lng?: number;
  is_verified: boolean;
  type: MinistryType;
  images: string[];
  interests: MissionType[];
  created_at: string;
  updated_at: string;
};
