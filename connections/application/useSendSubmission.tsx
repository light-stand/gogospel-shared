import { useMutation, useQueryClient } from "react-query";
import { connectionRepository } from "../interface/connectionRepository";
import { useUserStore } from "@/user/store/useUserStore";
import { Alert } from "react-native";
import { Mission } from "@/mission/domain/Mission";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { SupabaseError } from "@/interface/supabase";
import { sendMessage } from "@/chat/interface/chatApi";

export const useSendSubmission = (mission?: Mission) => {
  const router = useRouter();
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
    mutationFn: sendMessage,
  });

  const { mutateAsync: createConnection } = useMutation({
    mutationKey: "sendSubmission",
    mutationFn: connectionRepository.create,
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
