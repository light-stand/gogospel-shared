import { useMutation } from "react-query";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { queryClient } from "@/interface/queryClient";
import { SupabaseError } from "@/common/interface/api";
import { ConnectionStatus } from "../domain/Connection";
import { useApi } from "@/common/context/ApiContext";

export const useManageSubmission = (connectionId: number) => {
  const { t } = useTranslation();
  const { repo } = useApi();

  const onSuccess = () => {
    queryClient.invalidateQueries(["connections"]);
  };

  const onError = (error: any) => {
    const key = error.code === SupabaseError.Duplicated ? "alreadySent" : "unknown";
    Alert.alert(t(`connections.submission.errors.${key}`));
  };

  const { mutate: updateSubmission } = useMutation({
    mutationKey: "updateSubmission",
    mutationFn: repo?.connection.update,
    onSuccess,
    onError,
  });

  const manageSubmission = async (status: ConnectionStatus) => {
    if (!connectionId) return Alert.alert(t("mission.errors.notFound"));

    updateSubmission({
      id: connectionId,
      status,
    });

    //TODO send message
  };

  const onSubmissionManage = (status: ConnectionStatus) => () => {
    Alert.alert(
      t(`connections.submission.manage.popup.title.${status}`),
      t(`connections.submission.manage.popup.text.${status}`),
      [
        { text: t("action.cancel"), style: "cancel" },
        { text: t("action.next"), onPress: () => manageSubmission(status) },
      ]
    );
  };

  return { onSubmissionManage };
};
