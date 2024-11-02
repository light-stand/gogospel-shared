import { RealtimeChannel, RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { supabase } from "@/interface/supabase";
import { Message } from "../domain/Message";

export const subscribe = (
  room: string | number,
  userId: string,
  onMessage: (payload: RealtimePostgresInsertPayload<Message>) => void
) =>
  supabase
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

export const unsubscribe = (channel: RealtimeChannel) => {
  supabase.removeChannel(channel);
};

export const sendMessage = async (message: Omit<Message, "id">) => {
  const { data, error } = await supabase.from<string, Message>("message").insert(message as any);
  if (error) throw error;
};

export const getMessages = async (channelId: string | number) => {
  const { data, error } = await supabase
    .from<string, Message>("message")
    .select("*")
    .eq("connection_id", channelId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Message[];
};
