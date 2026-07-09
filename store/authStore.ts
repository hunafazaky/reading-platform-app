import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null, // Token tetap aman di memory selama aplikasi jalan
      setAuth: (accessToken, user) => set({ accessToken, user }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage', // Nama key di localStorage
      storage: createJSONStorage(() => localStorage),
      // PARTIALIZE: Bagian paling krusial! 
      // Kita HANYA menyimpan info user ke localStorage, accessToken tetap di-omit (dibuang) demi keamanan
      partialize: (state) => ({ user: state.user }), 
    }
  )
);