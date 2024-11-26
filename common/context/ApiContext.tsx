import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

import { useAuthInit } from "@/auth/hooks/useAuthInit";
import { ApiConnection, initializeApiConnection } from "@/interface/api";
import { useUserStore } from "@/user/store/useUserStore";
import { User } from "@/user/domain/User";

const ApiContext = createContext({} as ApiConnection);

export const useApi = () => useContext(ApiContext);

export const ApiClientProvider = ({ children }: { children: React.ReactElement }) => {
  const [apiConnection, setApiConnection] = useState({} as ApiConnection);
  const { setUser } = useUserStore();

  const init = useCallback(async () => {
    const connection = initializeApiConnection();
    const { data } = await connection.client.auth.getUser();
    const user: User = {
      id: data.user?.id,
      email: data.user?.email,
    };
    setUser(user);
    setApiConnection(connection);
  }, []);

  useEffect(() => {
    init();
  }, []);

  useAuthInit(apiConnection);

  return <ApiContext.Provider value={{ ...apiConnection }}>{children}</ApiContext.Provider>;
};
