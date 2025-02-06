import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { MissionCreationFields, missionCreationSchema } from "@/mission/domain/MissionCreationForm";
import { useUserStore } from "@/user/store/useUserStore";
import { useMissionDetails } from "@/mission/application/useMissionDetails";
import { parseDuration } from "@/mission/utils/parser";
import { useApi } from "@/common/context/ApiContext";

type UseMissionEditParams = {
  id: number;
  onSuccess: () => void;
};

export const useMissionEdit = ({ id, onSuccess }: UseMissionEditParams) => {
  const { repo } = useApi();
  const { user } = useUserStore();
  const { mission } = useMissionDetails(id);

  const form = useForm<MissionCreationFields>({
    resolver: zodResolver(missionCreationSchema),
    mode: "onChange",
    // defaultValues: Handled on the useEffect hook
  });

  const { noDuration, noStartDate } = form.getValues();
  form.watch(["noDuration", "noStartDate"]);

  const { mutateAsync: updateMission, isLoading } = useMutation(repo?.mission.update, {
    onSuccess,
  });

  const onSubmit = async () => {
    const { trigger, getValues } = form;
    const valid = await trigger();
    if (valid) {
      const mission = getValues();
      updateMission({
        id,
        active: mission.active,
        created_by: user?.id,
        title: mission.title,
        description: mission.description,
        start_date: mission.noStartDate ? null : mission.startDate,
        duration:
          mission.noDuration || !mission.duration
            ? null
            : mission.duration * mission.durationMultiplier,
        categories: mission.categories,
        location: `POINT(${mission.location.longitude} ${mission.location.latitude})`,
        location_name: mission.location.locationName,
        country: mission.location.country,
        ...(mission.image && { images: [mission.image] }),
      });
    }
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

  useEffect(() => {
    // Handle the case where the mission is not yet loaded
    if (!mission) return;
    form.reset({
      ...mission,
      duration: parseDuration(mission.duration)[0],
      image: mission.images ? mission.images[0] : "",
      startDate: new Date(mission.start_date || 0),
      durationMultiplier: parseDuration(mission.duration)[1],
      location: {
        latitude: mission.lat || 0,
        longitude: mission.long || 0,
        locationName: mission.location_name || "",
        country: mission.country || "",
      },
      noDuration: !mission.duration,
      noStartDate: !mission.start_date,
    });
  }, [mission, form]);

  return { form, onSubmit, isLoading, mission };
};
