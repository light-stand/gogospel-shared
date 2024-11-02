import { useQuery } from "react-query";
import { useUserStore } from "@/user/store/useUserStore";
import { userProfileRepository } from "../interface/userProfileRepository";
import { UserProfile } from "../domain/User";

const emptyProfile: UserProfile = {
  id: 0,
  user_id: "",
  name: "",
  description: "",
  is_verified: false,
  type: "ministry",
  images: [],
  interests: [],
  created_at: "",
  updated_at: "",
};

export const useUserProfile = (userId?: string) => {
  const { user } = useUserStore();
  const id = userId || user.id;

  const { data: profiles } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => userProfileRepository.get(["user_id", "eq", id]),
  });

  return profiles?.[0] || emptyProfile;
};
