import { Alert } from "react-native";
import { t } from "i18next";
import { useMutation, useQueryClient } from "react-query";

import { feedbackRepository } from "../interface/feedbackRepository";

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    Alert.alert(t("feedback.delete.success"));
    queryClient.invalidateQueries(["listFeedback"]);
  };

  const { mutateAsync: onDelete } = useMutation(feedbackRepository.delete, {
    onSuccess,
    onError: () =>
      Alert.alert(t("alerts.somethingWentWrong.title"), t("alerts.somethingWentWrong.text")),
  });

  return { onDelete };
};
