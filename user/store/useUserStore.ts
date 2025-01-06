import { create } from "zustand";
import { User } from "../domain/User";

interface UserState {
  user: User;
  setUser: (user: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {},
  setUser: (user) => set((state) => ({ user })),
}));
