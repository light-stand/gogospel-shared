import { create } from "zustand";
import { AuthData, Session } from "../domain/Auth";

interface AuthState extends AuthData {
  setSession: (session: Session) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));
