import { useMutation } from "react-query";
import { queryClient } from "@/interface/queryClient";
import { SupabaseError } from "@/common/interface/api";
import { ConnectionStatus } from "../domain/Connection";
import { useApi } from "@/common/context/ApiContext";

interface ManageSubmissionParams {
  connectionId: number;
  openAlert: (message: string, text?: string, onConfirm?: () => void) => void | Promise<void>;
  t: (path: string) => string;
}

export const useManageSubmission = ({ connectionId, openAlert, t }: ManageSubmissionParams) => {
  const { repo } = useApi();

  const onSuccess = () => {
    queryClient.invalidateQueries(["connections"]);
  };

  const onError = (error: any) => {
    const key = error.code === SupabaseError.Duplicated ? "alreadySent" : "unknown";
    openAlert(t(`connections.submission.errors.${key}`));
  };

  const { mutateAsync: updateSubmission } = useMutation({
    mutationKey: "updateSubmission",
    mutationFn: repo?.connection.update,
    onSuccess,
    onError,
  });

  const manageSubmission = async (status: ConnectionStatus) => {
    if (!connectionId) return openAlert(t("mission.errors.notFound"));

    await updateSubmission({
      id: connectionId,
      status,
    });

    //TODO send message
  };

  const onSubmissionManage = (status: ConnectionStatus) => () => {
    openAlert(
      t(`connections.submission.manage.popup.title.${status}`),
      t(`connections.submission.manage.popup.text.${status}`),
      () => manageSubmission(status)
      // [
      //   { text: t("action.cancel"), style: "cancel" },
      //   { text: t("action.next"), onPress:  },
      // ]
    );
  };

  return { onSubmissionManage };
};
