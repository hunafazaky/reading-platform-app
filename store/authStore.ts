import { create } from 'zustand';

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
  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));