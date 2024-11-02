import { useCallback } from "react";
import { Href, useFocusEffect, useRouter } from "expo-router";
import { UseFormReturn } from "react-hook-form";
import {
  fieldsByScreen,
  missionCreationFlow,
  MissionCreationScreen,
} from "../domain/MissionCreationForm";
import { useMissionCreationContext } from "../context/MissionCreationContext";
import { MissionCreationFields } from "../domain/MissionCreationForm";

export const getNextScreen = (current: MissionCreationScreen) => {
  const steps = missionCreationFlow;
  const nextIndex = steps.indexOf(current) + 1;
  const isLast = nextIndex > steps.length - 1;
  const nextScreen: Href = `/mission/creation/${steps[nextIndex]}`;
  return { nextScreen, isLast };
};

export const useMissionCreationStep = (screen: MissionCreationScreen) => {
  const router = useRouter();
  const { form, onSubmit } = useMissionCreationContext();
  const { trigger, clearErrors } = form as UseFormReturn<MissionCreationFields>;

  const onNext = async () => {
    const isValid = await trigger(fieldsByScreen[screen]);
    if (!isValid) return;
    const { nextScreen, isLast } = getNextScreen(screen);
    isLast ? onSubmit() : router.push(nextScreen);
  };

  useFocusEffect(
    useCallback(() => {
      clearErrors();
    }, [screen])
  );

  return { form, onNext };
};
