import React, { createContext, useContext, useState, useEffect } from "react";

import { useAuthInit } from "@/auth/hooks/useAuthInit";
import { ApiConnection, initializeApiConnection } from "@/interface/api";

const ApiContext = createContext({} as ApiConnection);

export const useApi = () => useContext(ApiContext);

export const ApiClientProvider = ({ children }: { children: React.ReactElement }) => {
  const [apiConnection, setApiConnection] = useState({} as ApiConnection);

  useEffect(() => {
    setApiConnection(initializeApiConnection());
  }, []);

  useAuthInit(apiConnection);

  return <ApiContext.Provider value={{ ...apiConnection }}>{children}</ApiContext.Provider>;
};
