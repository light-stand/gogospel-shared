import { supabase } from "@/interface/supabase";

export const login = async (data: { email: string; password: string }) => {
  const response = await supabase.auth.signInWithPassword(data);
  if (response.error) throw response.error;
  return response.data;
};

export const signup = async (data: { email: string; password: string }) => {
  const response = await supabase.auth.signUp(data);
  if (response.error) throw response.error;
  return response.data;
};

export const logout = async () => {
  const response = await supabase.auth.signOut();
  if (response.error) throw response.error;
  return response;
};
