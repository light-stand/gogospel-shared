import { Message } from "@/chat/domain/Message";
import { Mission } from "@/mission/domain/Mission";
import { UserProfile } from "@/user/domain/User";

export type Connection = {
  id: number;
  mission_id: number;
  user1_id: string;
  user2_id: string;
  mission?: Mission;
  user1?: UserProfile;
  user2?: UserProfile;
  status?: ConnectionStatus;
  messages?: Message[];
};

export enum ConnectionStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}
