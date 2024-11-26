import { Alert } from "react-native";
import { t } from "i18next";
import { useMutation, useQueryClient } from "react-query";

import { useApi } from "@/common/context/ApiContext";

export const useDeleteFeedback = () => {
  const queryClient = useQueryClient();
  const { repo } = useApi();

  const onSuccess = () => {
    Alert.alert(t("feedback.delete.success"));
    queryClient.invalidateQueries(["listFeedback"]);
  };

  const { mutateAsync: onDelete } = useMutation(repo?.feedback.delete, {
    onSuccess,
    onError: () =>
      Alert.alert(t("alerts.somethingWentWrong.title"), t("alerts.somethingWentWrong.text")),
  });

  return { onDelete };
};
