import { AuthResponse } from "@supabase/supabase-js";

export type User = AuthResponse["data"]["user"];
export type Session = AuthResponse["data"]["session"];

export type AuthData = {
  session: Session;
};
