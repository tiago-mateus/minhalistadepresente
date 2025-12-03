import { api } from '../api/axios';
import type { AuthResponse } from '../types/User';

interface AuthPayload {
  email: string;
  password?: string;
  name?: string;
}

export const authService = {
  login: async (payload: AuthPayload) => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  register: async (payload: AuthPayload & { name: string }) => {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data;
  },
};
