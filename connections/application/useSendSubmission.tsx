import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";

import { useUserStore } from "@/user/store/useUserStore";
import { Mission } from "@/mission/domain/Mission";
import { SupabaseError } from "@/common/interface/api";
import { sendMessage } from "@/chat/interface/chatApi";
import { useApi } from "@/common/context/ApiContext";

export const useSendSubmission = (mission?: Mission) => {
  const router = useRouter();
  const { repo, client } = useApi();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const onSuccess = () => {
    router.push("/(main)/connections");
  };

  const onError = (error: any) => {
    const key = error.code === SupabaseError.Duplicated ? "alreadySent" : "unknown";
    Alert.alert(t(`connections.submission.errors.${key}`));
  };

  const { mutateAsync: sendMessageMutation } = useMutation({
    mutationKey: "sendMessage",
    mutationFn: sendMessage(client),
  });

  const { mutateAsync: createConnection } = useMutation({
    mutationKey: "sendSubmission",
    mutationFn: repo?.connection.create,
    onSuccess,
    onError,
  });
  const { user } = useUserStore();

  const sendSubmission = async ({ message }: { message: string }) => {
    if (!mission) return Alert.alert(t("mission.errors.notFound"));
    // if (user.type !== UserType.Missionary) return Alert.alert(t("error.notMissionary"));
    if (!user.id || !mission.created_by) return Alert.alert(t("errors.unknown"));

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
