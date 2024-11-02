import { useQuery } from "react-query";
import { connectionRepository } from "../interface/connectionRepository";
import { useUserStore } from "@/user/store/useUserStore";

export const useListConnections = () => {
  const { user } = useUserStore();
  return useQuery({
    queryKey: ["connections", user?.id],
    queryFn: () => connectionRepository.getForUser(user?.id),
  });
};
