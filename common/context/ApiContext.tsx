import React, { createContext, useContext, useState, useEffect } from "react";

import { useAuthInit } from "@/auth/hooks/useAuthInit";
import { useUserInit } from "@/user/application/useUserInit";
import { ApiConnection, initializeApiConnection } from "@/common/interface/api";

const ApiContext = createContext({} as ApiConnection);

export const useApi = () => useContext(ApiContext);

export const ApiClientProvider = ({ children }: { children: React.ReactElement }) => {
  const [value, setValue] = useState({} as ApiConnection);

  useEffect(() => {
    setValue(initializeApiConnection());
  }, []);

  useAuthInit(value.client);
  useUserInit(value.repo?.userProfile);

  return <ApiContext.Provider value={{ ...value }}>{children}</ApiContext.Provider>;
};
