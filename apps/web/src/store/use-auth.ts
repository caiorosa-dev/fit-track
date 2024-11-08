import { create } from 'zustand';
import { axiosClient } from '@/services/axios';
import { createJSONStorage, persist } from 'zustand/middleware';
import cookiesStorage from '@/lib/cookie-storage';

export type LoginPayload = {
  email: string;
  password: string;
};

type AuthStore = {
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create(
  persist<AuthStore>(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,

      login: async (payload: LoginPayload) => {
        const response = await axiosClient.post<{ access_token?: string }>(
          '/auth/sign-in',
          payload
        );

        set({ isAuthenticated: true, accessToken: response.data.access_token });
      },
      logout: async () => {
        set({ isAuthenticated: false, accessToken: null });
      },
    }),
    {
      name: 'fit-track-auth',
      storage: createJSONStorage(() => cookiesStorage),
    }
  )
);
