import { useEffect, useMemo, useState } from "react";
import { subscribe, unsubscribe, sendMessage, getMessages } from "../interface/chatApi";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useUserStore } from "@/user/store/useUserStore";
import { Message } from "../domain/Message";
import { Message as IMessage } from "../domain/Message";
import { Updater } from "react-query/types/core/utils";

export const useChatConnection = (channelId: number) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const setMessages = (setter: Updater<Message[] | undefined, Message[]>) =>
    queryClient.setQueryData(["messages", channelId], setter);

  const { data: messages, isLoading } = useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => getMessages(channelId),
    initialData: [],
  });

  const { mutate: sendMessageMutation } = useMutation({
    mutationKey: "sendMessage",
    mutationFn: sendMessage,
    onSuccess: (data, variables) => {
      // TODO: Check optimization and necesity of this
      setMessages((prev: Message[] | undefined) =>
        (prev as Message[]).map((msg) =>
          msg.text === variables.text ? { ...msg, pending: false } : msg
        )
      );
      queryClient.invalidateQueries(["connections", channelId]);
    },
  });

  const onMessage = (payload: RealtimePostgresInsertPayload<Message>) => {
    if (payload.new.user_id === user.id) return;
    setMessages((prev: Message[] | undefined) => [payload.new, ...(prev as Message[])]);
    queryClient.invalidateQueries(["connections", channelId]);
  };

  const handleSend = (message: Omit<Message, "id">) => {
    setMessages((prev: Message[] | undefined) => [
      { ...message, id: Date.now(), pending: true },
      ...(prev as Message[]),
    ]);
    sendMessageMutation({ ...message, connection_id: channelId });
  };

  useEffect(() => {
    const channel = subscribe(channelId, user.id as string, onMessage);
    return () => unsubscribe(channel);
  }, []);

  return { messages, handleSend, isLoading };
};
