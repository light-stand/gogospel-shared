import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js";

export type SupabaseFilter = [string, string, any];

export enum RepositoryError {
  Duplicated = "23505",
}

export class Repository<T> {
  public tableName: string;
  public client: SupabaseClient;

  constructor(tableName: string, client: SupabaseClient) {
    this.tableName = tableName;
    this.client = client;
  }

  get = async (filters: SupabaseFilter | SupabaseFilter[], select = "*"): Promise<T[]> => {
    const query = this.client.from<string, T>(this.tableName).select(select);

    if (Array.isArray(filters[0])) {
      filters.forEach((filter: SupabaseFilter) => query.filter(...filter));
    } else if (filters.length === 3) {
      query.filter(...(filters as SupabaseFilter));
    }

    const { data, error } = await query;

    if (error) throw error;

    return data as T[];
  };

  getById = async (id: string | number, select = "*"): Promise<T> => {
    const { data, error } = await this.client
      .from<string, T>(this.tableName)
      .select(select)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as T;
  };

  create = async (newData: Omit<T, "id" | "created_at" | "updated_at">): Promise<T> => {
    const { data, error }: PostgrestSingleResponse<T> = await this.client
      .from<string, T>(this.tableName)
      .insert(newData as any)
      .select("*")
      .single();

    if (error) throw error.code as RepositoryError;

    return data as T;
  };

  update = async ({ id, ...updatedData }: Partial<T> & { id: number | string }): Promise<T> => {
    const { data, error }: PostgrestSingleResponse<T> = await this.client
      .from<string, T>(this.tableName)
      .update(updatedData as any)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as T;
  };

  delete = async (id: number | string): Promise<T> => {
    const { data, error }: PostgrestSingleResponse<T> = await this.client
      .from<string, T>(this.tableName)
      .delete()
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as T;
  };
}
