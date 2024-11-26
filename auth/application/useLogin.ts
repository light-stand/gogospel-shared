import { useRouter } from "expo-router";
import { useMutation } from "react-query";

import { login } from "../interface/authApi";
import { useApi } from "@/common/context/ApiContext";

export const useLogin = () => {
  const router = useRouter();
  const { client } = useApi();

  const onSuccess = async () => {
    router.push("/(main)");
  };

  const loginMutation = useMutation(login(client), { onSuccess });

  return loginMutation;
};
