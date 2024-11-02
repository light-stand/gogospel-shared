import { useRouter } from "expo-router";
import { useMutation } from "react-query";
import { login } from "../interface/authApi";

export const useLogin = () => {
  const router = useRouter();

  const onSuccess = async () => {
    router.push("/(main)");
  };

  const loginMutation = useMutation(login, { onSuccess });

  return loginMutation;
};
