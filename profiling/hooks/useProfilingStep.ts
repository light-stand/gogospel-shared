import { useCallback } from "react";
import { Href, useFocusEffect, useRouter } from "expo-router";
import { UseFormReturn } from "react-hook-form";
import { fieldsByScreen, profilingFlow, ProfilingScreen } from "../domain/Profiling";
import { useProfilingContext } from "../context/ProfilingContext";
import { ProfilingFields } from "../domain/ProfilingForm";

export const getNextScreen = (current: ProfilingScreen) => {
  const nextIndex = profilingFlow.indexOf(current) + 1;
  const isLast = nextIndex > profilingFlow.length - 1;
  const nextScreen: Href = `/onboarding/profiling/${profilingFlow[nextIndex]}`;
  return { nextScreen, isLast };
};

export const useProfilingStep = (screen: ProfilingScreen) => {
  const router = useRouter();
  const { form, onSubmit } = useProfilingContext();
  const { trigger, getValues, resetField, clearErrors, reset, handleSubmit } =
    form as UseFormReturn<ProfilingFields>;

  const onNext = async () => {
    // const flowType = getValues("type") as UserType;
    const isValid = await trigger(fieldsByScreen[screen]);
    if (!isValid) return;
    const { nextScreen, isLast } = getNextScreen(screen);
    isLast ? onSubmit() : router.push(nextScreen);
  };

  useFocusEffect(
    useCallback(() => {
      // if (screen === "type") {
      // // to avoid validation problems
      //   resetField("lastName"); 
      //   resetField("interests");
      // }
      clearErrors();
    }, [screen])
  );

  return { form, onNext };
};
