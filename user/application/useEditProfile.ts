import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { useUserStore } from "@/user/store/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { profilingSchema } from "@/profiling/domain/ProfilingForm";
import { useApi } from "@/common/context/ApiContext";
import { useUserProfile } from "@/user/application/useUserProfile";
import { UserProfile } from "@/user/domain/User";

export const useEditProfile = ({ onSuccess: onSuccessCallback }: { onSuccess: VoidFunction }) => {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const profile = useUserProfile();
  const { repo } = useApi();

  const { name, description, images, interests, type } = profile as UserProfile;

  const form = useForm({
    resolver: zodResolver(profilingSchema),
    mode: "onBlur",
    defaultValues: profile && {
      name,
      bio: description,
      picture: images[0],
      interests,
      ministryType: [type],
    },
  });

  const onSuccess = () => {
    queryClient.invalidateQueries(["profile", user.id]);
    onSuccessCallback();
    form.reset();
  };

  const { mutate: updateProfile } = useMutation(repo?.userProfile.update, {
    onSuccess,
  });

  const onSubmit = form.handleSubmit((data) => {
    updateProfile({
      id: profile.id,
      name: data.name,
      description: data.bio,
      images: [data.picture],
      type: data.ministryType[0],
      interests: data.interests,
    });
  });

  return { form, onSubmit };
};
