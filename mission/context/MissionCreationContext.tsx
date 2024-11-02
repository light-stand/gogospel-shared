import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";
import { MissionCreationFields } from "../domain/MissionCreationForm";

type MissionCreationContextType = {
  form: UseFormReturn<MissionCreationFields>;
  onSubmit: () => void;
};

interface MissionCreationProviderProps extends MissionCreationContextType {
  children: React.ReactNode;
}

const MissionCreationContext = createContext<MissionCreationContextType>({
  form: {} as UseFormReturn<MissionCreationFields>,
  onSubmit: async () => {},
});

export const useMissionCreationContext = () => useContext(MissionCreationContext);

export const MissionCreationProvider: React.FC<MissionCreationProviderProps> = ({
  children,
  form,
  onSubmit,
}) => {
  return (
    <MissionCreationContext.Provider value={{ form, onSubmit }}>
      {children}
    </MissionCreationContext.Provider>
  );
};
