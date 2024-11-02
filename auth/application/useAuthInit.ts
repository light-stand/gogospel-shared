import { useRootNavigationState, useRouter } from "expo-router";
import { useEffect } from "react";
import { supabase } from "@/interface/supabase";
import { useAuthStore } from "../store/useAuthStore";

export const useAuthInit = () => {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const { session, setSession } = useAuthStore();

  const isRouterInitialized = navigationState?.key;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    supabase.auth.onAuthStateChange((_event, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (!isRouterInitialized) return;
    // router.push(session?.access_token ? "/(main)" : "/onboarding/welcome");
    router.push("/(main)");
    // router.push("/mission/creation");
  }, [isRouterInitialized, session]);
};
