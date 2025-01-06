import { useMutation, useQueryClient } from "react-query";

import { useUserStore } from "@/user/store/useUserStore";
import { Mission } from "@/mission/domain/Mission";
import { sendMessage } from "@/chat/interface/chatApi";
import { useApi } from "@/common/context/ApiContext";
import { SupabaseError } from "@/common/interface/api";

export type UseSendSubmissionParams = {
  mission?: Mission;
  onSuccess?: () => void;
  onError: (error: string) => void;
};

export const useSendSubmission = ({ mission, onError, onSuccess }: UseSendSubmissionParams) => {
  const { repo, client } = useApi();
  const queryClient = useQueryClient();

  const onMutationError = (error: any) => {
    const key = error.code === SupabaseError.Duplicated ? "alreadySent" : "unknown";
    onError(`connections.submission.errors.${key}`);
  };

  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationKey: "sendMessage",
    mutationFn: sendMessage(client),
  });

  const { mutateAsync: createConnection } = useMutation({
    mutationKey: "sendSubmission",
    mutationFn: repo?.connection.create,
    onSuccess,
    onError: onMutationError,
  });
  const { user } = useUserStore();

  const sendSubmission = async ({ message }: { message: string }) => {
    if (!mission) return onError("mission.errors.notFound");
    if (!user.id || !mission.created_by) return onError("errors.unknown");

    const connection = await createConnection({
      mission_id: mission.id,
      user1_id: user.id,
      user2_id: mission.created_by,
    });

    await sendMessageMutation({
      user_id: user.id as string,
      connection_id: connection.id,
      text: message,
      created_at: new Date(),
    });

    queryClient.invalidateQueries(["connections"]);
  };

  return { sendSubmission };
};
