import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { User } from "../domain/User";
import { useUserStore } from "../store/useUserStore";
import { type UserProfileRepository } from "../interface/userProfileRepository";

export const useUserInit = (userProfileRepository?: UserProfileRepository) => {
  const router = useRouter();
  const { session } = useAuthStore();
  const { setUser, user } = useUserStore();

  // TEMP: This is a temporary solution to redirect users to the onboarding process
  const fetchUserProfiles = async () => {
    if (userProfileRepository && session?.user.id && session.user.id !== user?.id) {
      const [userProfile] = await userProfileRepository.get(["user_id", "eq", session.user.id]);

      if (session?.user.id && !userProfile) {
        router.replace("/onboarding/profiling/name");
        return;
      }

      const user: User = {
        id: session.user.id,
        email: session.user.email,
      };

      setUser(user);
    }
  };

  useEffect(() => {
    if (session && userProfileRepository) fetchUserProfiles();
  }, [session, userProfileRepository]);
};
