import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { MissionCreationFields, missionCreationSchema } from "@/mission/domain/MissionCreationForm";
import { useUserStore } from "@/user/store/useUserStore";
import { useApi } from "@/common/context/ApiContext";

interface useMissionCreationParams {
  onSuccess: () => void;
}

export const useMissionCreation = ({ onSuccess: successCallback }: useMissionCreationParams) => {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const { repo } = useApi();

  const form = useForm<MissionCreationFields>({
    resolver: zodResolver(missionCreationSchema),
    mode: "onBlur",
    defaultValues: { durationMultiplier: 7, duration: 1 },
  });

  const { getValues } = form;
  const { noDuration, noStartDate } = getValues();
  form.watch(["noDuration", "noStartDate"]);

  const onSuccess = () => {
    queryClient.invalidateQueries(["listMissions", "myMissions"]);
    successCallback();
  };

  const { mutate: createMission } = useMutation(repo?.mission.create, { onSuccess });

  const onSubmit = () => {
    const values = getValues();
    createMission({
      created_by: user?.id,
      title: values.title,
      description: values.description,
      start_date: values.noStartDate ? null : values.startDate,
      duration:
        values.noDuration || !values.duration ? null : values.duration * values.durationMultiplier,
      categories: values.categories,
      location: `POINT(${values.location.longitude} ${values.location.latitude})`,
      location_name: values.location.locationName,
      country: values.location.country,
      ...(values.image && { images: [values.image] }),
    });
  };

  useEffect(() => {
    if (!noDuration) return;
    form.setValue("duration", 1);
    form.setValue("durationMultiplier", 7);
  }, [noDuration]);

  useEffect(() => {
    if (!noStartDate) return;
    form.setValue("startDate", new Date());
  }, [noStartDate]);

  return { form, onSubmit };
};
