import { useMutation } from "react-query";

import { useApi } from "@/common/context/ApiContext";
import { resetPasswordForEmail } from "../interface/resetPasswordApi";

export const useResetPasswordRequest = ({ onSuccess }: { onSuccess: VoidFunction }) => {
  const { client } = useApi();

  const sendResetEmailMutation = useMutation(resetPasswordForEmail(client), { onSuccess });

  return { sendResetEmailMutation };
};
