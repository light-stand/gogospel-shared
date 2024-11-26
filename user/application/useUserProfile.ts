import { useQuery } from "react-query";
import { useUserStore } from "@/user/store/useUserStore";
import { UserProfile } from "../domain/User";
import { useApi } from "@/common/context/ApiContext";

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
  const { repo } = useApi();
  const { user } = useUserStore();
  const id = userId || user.id;

  const { data: profiles } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => repo?.userProfile.get(["user_id", "eq", id]),
  });

  return profiles?.[0] || emptyProfile;
};
