import { ApiConnection } from "@/common/interface/api";

export const login =
  (client: ApiConnection["client"]) => async (data: { email: string; password: string }) => {
    const response = await client.auth.signInWithPassword(data);
    if (response.error) throw response.error;
    return response.data;
  };

export const signup =
  (client: ApiConnection["client"]) => async (data: { email: string; password: string }) => {
    const response = await client.auth.signUp(data);
    if (response.error) throw response.error;
    return response.data;
  };

export const logout = (client: ApiConnection["client"]) => async () => {
  const response = await client.auth.signOut();
  if (response.error) throw response.error;
  return response;
};
