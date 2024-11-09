import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProfilingFields, profilingSchema } from "@/profiling/domain/ProfilingForm";
import { useAuthStore } from "@/auth/store/useAuthStore";
import { useUserStore } from "@/user/store/useUserStore";
import { MissionType } from "@/mission/domain/MissionType";
import { MinistryType } from "@/user/domain/MinistryType";
import { UserProfile } from "@/user/domain/User";
import { useApi } from "@/common/context/ApiContext";

export const useProfiling = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const { session } = useAuthStore();
  const queryClient = useQueryClient();
  const { repo } = useApi();

  const form = useForm<ProfilingFields>({
    resolver: zodResolver(profilingSchema),
    mode: "onBlur",
  });

  const { getValues } = form;

  const onSuccess = (data: UserProfile) => {
    queryClient.invalidateQueries(["profile", user.id]);
    router.push("/(main)");
  };

  const { mutate: createProfile } = useMutation(repo?.userProfile.create, {
    onSuccess,
  });

  const onSubmit = () => {
    const values = getValues();
    createProfile({
      user_id: session?.user.id as string,
      name: values.name,
      description: values.bio,
      images: [values.picture],
      is_verified: false,
      type: values.ministryType[0] as MinistryType,
      interests: values.interests as MissionType[],
    });
  };

  return { form, onSubmit };
};
