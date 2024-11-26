import { useMutation } from "react-query";
import { useRouter } from "expo-router";

import { signup } from "../interface/authApi";
import { useApi } from "@/common/context/ApiContext";

export const useSignup = () => {
  const router = useRouter();
  const { client } = useApi();

  const onSuccess = async () => {
    router.push("/onboarding/profiling/name");
  };

  const loginMutation = useMutation(signup(client), { onSuccess });

  return loginMutation;
};
