import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { verifyCodeApi } from "../interface/verifyCodeApi";
import { useUserStore } from "../store/useUserStore";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { VerifyCode, verifyCodeSchema } from "../domain/verifyCode";
import { useApi } from "@/common/context/ApiContext";

export const useVerifyCode = (onValidationSuccess: VoidFunction) => {
  const { t } = useTranslation();
  const { client } = useApi();
  const form = useForm<VerifyCode>({
    resolver: zodResolver(verifyCodeSchema),
  });
  const { user } = useUserStore();

  const onError = () => {
    form.setError("code", { message: t("user.verificationCode.errors.invalid") });
  };

  const onSuccess = () => {
    onValidationSuccess();
  };

  const { mutate } = useMutation(verifyCodeApi(client), { onError, onSuccess });

  const onSubmit = form.handleSubmit(({ code }) => {
    mutate({ userId: user.id as string, code });
  });

  return { form, onSubmit };
};
