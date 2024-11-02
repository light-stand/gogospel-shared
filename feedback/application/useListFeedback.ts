import { useState } from "react";
import { useQuery } from "react-query";

import { useUserStore } from "@/user/store/useUserStore";
import { feedbackRepository } from "../interface/feedbackRepository";
import { SupabaseFilter } from "@/interface/repository";
import { ListFeedbackModes } from "../domain/Feedback";

export const useListFeedback = (userId?: string) => {
  const { user } = useUserStore();
  const [mode, setMode] = useState<ListFeedbackModes>("received");

  const listFeedbackFilters =
    mode === "received" ? ["target_user_id", "eq", userId] : ["user_id", "eq", user?.id];

  const select = [
    "*",
    "user:user_profile!feedback_user_id_fkey(name, images)",
    "target_user:user_profile!feedback_target_user_id_fkey(name, images)",
    "mission(title)",
  ].join(",");

  return {
    query: useQuery({
      queryKey: ["listFeedback", listFeedbackFilters],
      queryFn: () =>
        feedbackRepository.get(listFeedbackFilters as SupabaseFilter | SupabaseFilter[], select),
    }),
    mode,
    setMode,
  };
};
