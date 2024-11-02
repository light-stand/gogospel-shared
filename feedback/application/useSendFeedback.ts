import { useMemo } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";

import { useUserStore } from "@/user/store/useUserStore";
import { feedbackRepository } from "../interface/feedbackRepository";
import { FeedbackCreationFields, feedbackCreationSchema } from "../domain/FeedbackSendForm";
import { Connection } from "@/connections/domain/Connection";
import { Alert } from "react-native";
import { t } from "i18next";
import { RepositoryError } from "@/interface/repository";

export const useSendFeedback = (connectionId?: number) => {
  const router = useRouter();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const connection = useMemo(() => {
    const connections = queryClient.getQueryData<Connection[]>(["connections", user.id]);
    if (!connections) return;
    return connections.find((connection) => connection.id === connectionId);
  }, [queryClient, user?.id]);

  const targetUserId = useMemo(() => {
    if (!connection) return;
    return user.id === connection.user1_id ? connection.user2_id : connection.user1_id;
  }, [connection, user?.id]);

  const form = useForm<FeedbackCreationFields>({
    resolver: zodResolver(feedbackCreationSchema),
    mode: "onBlur",
  });

  const onSuccess = () => {
    Alert.alert(t("feedback.creation.success"));
    queryClient.invalidateQueries(["listFeedback"]);
    router.back();
  };

  const { mutateAsync: sendFeedbackMutation } = useMutation(feedbackRepository.create, {
    onSuccess,
    onError: (error) => {
      Alert.alert(
        t(
          `feedback.creation.errors.${
            error === RepositoryError.Duplicated ? "alreadySent" : "unknown"
          }`
        )
      );
    },
  });

  const onSubmit = form.handleSubmit((feedback) =>
    sendFeedbackMutation({
      ...feedback,
      mission_id: connection?.mission_id,
      target_user_id: targetUserId as string,
      user_id: user.id as string,
    })
  );

  return {
    form,
    onSubmit,
  };
};
