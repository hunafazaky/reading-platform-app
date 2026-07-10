import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  pen_name: string;
  photo: string;
  bio: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isRefreshing: boolean;
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  setRefreshing: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isRefreshing: false,
      setAuth: (accessToken, user) => set({ accessToken, user }),
      clearAuth: () => set({ user: null, accessToken: null }),
      setRefreshing: (status) => set({ isRefreshing: status }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
