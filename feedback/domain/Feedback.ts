import { Mission } from "@/mission/domain/Mission";
import { UserProfile } from "@/user/domain/User";

export type Feedback = {
  id: number;
  user_id: string;
  target_user_id: string;
  mission_id?: number;
  title: string;
  description: string;
  rating?: number;
  mission?: Mission;
  user?: UserProfile;
  target_user?: UserProfile;
  created_at: Date;
};

export type ListFeedbackModes = "received" | "given";
