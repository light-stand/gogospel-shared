import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useAuthInit } from "@/auth/application/useAuthInit";
import { useUserInit } from "@/user/application/useUserInit";
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from "@expo-google-fonts/quicksand";

SplashScreen.preventAutoHideAsync();

export default function useAppSetup() {
  const [loaded] = useFonts({
    Quicksand_300Light,
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  useAuthInit();
  useUserInit();

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  return { loaded };
}
