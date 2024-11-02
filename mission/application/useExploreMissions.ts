import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { missionRepository } from "../interface/missionRepository";
import { useForm } from "react-hook-form";
import { ExploreFilters, exploreFiltersSchema } from "../domain/ExploreFilters";
import { zodResolver } from "@hookform/resolvers/zod";

export const defaultFilters: ExploreFilters = {
  interests: [],
  ministryType: [],
  distance: 0,
};

export const useExploreMissions = (location = { lat: 0, long: 0 }) => {
  const [focused, setFocused] = useState(0);
  const filters = useForm<ExploreFilters>({
    resolver: zodResolver(exploreFiltersSchema),
    defaultValues: defaultFilters,
  });

  const filterValues = filters.getValues();

  const { data: missions } = useQuery({
    queryKey: ["missions", { ...filterValues, ...location }],
    queryFn: () => missionRepository.exploreMissions({ ...filterValues, ...location }),
  });

  const mission = useMemo(() => missions?.find((m) => m.id === focused), [missions, focused]);

  useEffect(() => {
    if (!mission && missions) setFocused(missions?.[Math.floor(missions.length - 1)]?.id || 0);
  }, [missions, mission, focused]);

  return { focused, setFocused, missions, filters, mission };
};
