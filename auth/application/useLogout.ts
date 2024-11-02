import { useRouter } from "expo-router";
import { useMutation } from "react-query";
import { logout } from "../interface/authApi";

export const useLogout = () => {
  const router = useRouter();

  const onSuccess = async () => {
    router.push("/onboarding/welcome");
  };

  const logoutMutation = useMutation(logout, { onSuccess });

  return logoutMutation.mutate;
};
