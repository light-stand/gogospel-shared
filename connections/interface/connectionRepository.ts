import { Repository, SupabaseFilter } from "@/interface/repository";
import { Connection, ConnectionStatus } from "../domain/Connection";
import { supabase } from "@/interface/supabase";

class ConnectionRepository extends Repository<Connection> {
  constructor() {
    super("connection", supabase);
  }

  getForUser = async (userId?: string): Promise<Connection[]> => {
    if (!userId) return [];
    const query = this.client
      .from<string, Connection>(this.tableName)
      .select(
        `*, user1:user_profile!user1_id(images, name), user2:user_profile!user2_id(images, name), mission(title), messages:message(text)`
      )
      .or(
        `and(user1_id.eq.${userId},status.neq.${ConnectionStatus.Rejected}),user2_id.eq.${userId}`
      )
      .order("created_at", { referencedTable: "message", ascending: false })
      .limit(1, { foreignTable: "message" });

    const { data, error } = await query;

    if (error) throw error;

    return data as unknown as Connection[];
  };
}

export const connectionRepository = new ConnectionRepository();
