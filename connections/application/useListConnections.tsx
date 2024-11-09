import { useQuery } from "react-query";
import { useUserStore } from "@/user/store/useUserStore";
import { useApi } from "@/common/context/ApiContext";

export const useListConnections = () => {
  const { repo } = useApi();
  const { user } = useUserStore();
  return useQuery({
    queryKey: ["connections", user?.id],
    queryFn: () => repo?.connection.getForUser(user?.id),
  });
};
