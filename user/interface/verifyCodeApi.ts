import { supabase } from "@/interface/supabase";

export const verifyCodeApi = async ({ userId, code }: { userId: string; code: string }) => {
  if (!userId || !code) throw "Invalid user id or code";
  const { data, error } = await supabase.rpc("verify_user_with_code", {
    p_user_id: userId,
    p_verification_code: code,
  });

  if (error) throw error;
  if (data !== "SUCCESS") throw new Error(data);

  return data;
};
