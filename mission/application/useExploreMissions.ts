import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { ExploreFilters, exploreFiltersSchema } from "../domain/ExploreFilters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/common/context/ApiContext";

export const defaultFilters: ExploreFilters = {
  interests: [],
  ministryType: [],
  distance: 0,
};

export const useExploreMissions = (location = { lat: 0, long: 0 }) => {
  const { client, repo } = useApi();
  const [focused, setFocused] = useState<number | null>(null);
  const filters = useForm<ExploreFilters>({
    resolver: zodResolver(exploreFiltersSchema),
    defaultValues: defaultFilters,
  });

  const filterValues = filters.getValues();

  const { data: missions, refetch } = useQuery({
    queryKey: ["missions", { ...filterValues, ...location }],
    queryFn: () => repo?.mission.exploreMissions({ ...filterValues, ...location }),
    enabled: !!client,
  });

  const mission = useMemo(() => missions?.find((m) => m.id === focused), [missions, focused]);

  return { focused, setFocused, missions, filters, mission, refetch };
};
