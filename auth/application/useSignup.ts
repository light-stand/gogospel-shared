import { useMutation } from "react-query";
import { useRouter } from "expo-router";
import { signup } from "../interface/authApi";

export const useSignup = () => {
  const router = useRouter();

  const onSuccess = async () => {
    router.push("/onboarding/profiling/name");
  };

  const loginMutation = useMutation(signup, { onSuccess });

  return loginMutation;
};
