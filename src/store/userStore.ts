// src/store/userStore.ts
import { User, AuthState } from "../types/User";
import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

export const useUserStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        setUser: (user: User) => set({ user }),

        clearUser: () => set({ user: null }),
      }),
      {
        name: "auth",
      }
    )
  )
);
