import { create } from 'zustand';
import type { AuthResponse, User } from '../types/User';

interface UserState {
  user: User | null;
  token: string | null;
  login: (payload: AuthResponse) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  token: null,
  login: ({ user, token }) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));
