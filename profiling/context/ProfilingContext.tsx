import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProfilingFields } from "../domain/ProfilingForm";

type ProfilingContextType = {
  form: UseFormReturn<ProfilingFields>;
  onSubmit: () => void;
};

interface ProfilingProviderProps extends ProfilingContextType {
  children: React.ReactNode;
}

const ProfilingContext = createContext<ProfilingContextType>({
  form: {} as UseFormReturn<ProfilingFields>,
  onSubmit: async () => {},
});

export const useProfilingContext = () => useContext(ProfilingContext);

export const ProfilingProvider: React.FC<ProfilingProviderProps> = ({
  children,
  form,
  onSubmit,
}) => {
  return (
    <ProfilingContext.Provider value={{ form, onSubmit }}>{children}</ProfilingContext.Provider>
  );
};
