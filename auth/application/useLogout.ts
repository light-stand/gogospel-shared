import { useRouter } from "expo-router";
import { useMutation } from "react-query";

import { logout } from "../interface/authApi";
import { useApi } from "@/common/context/ApiContext";

export const useLogout = () => {
  const router = useRouter();
  const { client } = useApi();

  const onSuccess = async () => {
    router.push("/onboarding/welcome");
  };

  const logoutMutation = useMutation(logout(client), { onSuccess });

  return logoutMutation.mutate;
};
