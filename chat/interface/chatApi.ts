import { RealtimeChannel, RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { ApiConnection } from "@/common/interface/api";
import { Message } from "../domain/Message";

export const subscribe =
  (client: ApiConnection["client"]) =>
  (
    room: string | number,
    userId: string,
    onMessage: (payload: RealtimePostgresInsertPayload<Message>) => void
  ) => {
    if (!client) return;
    return client
      .channel(`room:${room}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "message",
          filter: `connection_id=eq.${room}`,
        },
        onMessage
      )
      .subscribe();
  };

export const unsubscribe = (client: ApiConnection["client"]) => (channel: RealtimeChannel) => {
  if (!client) return;
  client.removeChannel(channel);
};

export const sendMessage =
  (client: ApiConnection["client"]) => async (message: Omit<Message, "id">) => {
    if (!client) return;
    const { data, error } = await client.from<string, Message>("message").insert(message as any);
    if (error) throw error;
  };

export const getMessages =
  (client: ApiConnection["client"]) => async (channelId: string | number) => {
    if (!client) return [];
    const { data, error } = await client
      .from<string, Message>("message")
      .select("*")
      .eq("connection_id", channelId)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data as Message[];
  };
