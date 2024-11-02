import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useCallback } from "react";

enum ConnectionActions {
  AddFeedback = 1,
}

export const useConnectionActions = (connectionId?: number) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { showActionSheetWithOptions } = useActionSheet();

  const handleAction = useCallback((index?: number) => {
    switch (index) {
      case ConnectionActions.AddFeedback:
        router.push(`/feedback/add/${connectionId}`);
        break;
    }
  }, []);

  const open = () => {
    showActionSheetWithOptions(
      {
        options: [
          t("action.cancel"),
          t("connections.submission.actions.addFeedback"),
          t("connections.submission.actions.delete"),
        ],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 2,
      },
      handleAction
    );
  };

  return { open };
};
