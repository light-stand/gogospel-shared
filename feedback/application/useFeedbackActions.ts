import { useCallback } from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { useActionSheet } from "@expo/react-native-action-sheet";

import { useDeleteFeedback } from "./useDeleteFeedback";

enum FeedbackActions {
  Remove = 1,
}

export const useFeedbackActions = (feedbackId?: number) => {
  const { t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();
  const { onDelete } = useDeleteFeedback();

  const handleDeletePress = useCallback(() => {
    Alert.alert(t("feedback.delete.title"), t("feedback.delete.text"), [
      { text: t("action.cancel"), style: "cancel" },
      {
        text: t("action.delete"),
        style: "destructive",
        onPress: () => feedbackId && onDelete(feedbackId),
      },
    ]);
  }, [feedbackId]);

  const handleAction = useCallback(
    (index?: number) => {
      switch (index) {
        case FeedbackActions.Remove:
          handleDeletePress();
          break;
      }
    },
    [handleDeletePress]
  );

  const open = () => {
    showActionSheetWithOptions(
      {
        options: [t("action.cancel"), t("feedback.actions.delete")],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
      },
      handleAction
    );
  };

  return { open };
};
