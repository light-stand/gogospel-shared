import { ApiConnection } from "@/common/interface/api";
import { ResetPassowordRequestFields } from "../domain/ResetPassword";

export const resetPasswordForEmail =
  (client: ApiConnection["client"]) =>
  async ({ email, redirectUrl }: ResetPassowordRequestFields) => {
    const response = await client.auth.resetPasswordForEmail(email, { redirectTo: redirectUrl });
    if (response.error) throw response.error;
    return response.data;
  };
