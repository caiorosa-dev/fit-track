import { env } from '@/services/env';
import { useAuth } from '@/store/use-auth';
import axios from 'axios';
import { toast } from 'sonner';

export function useApi() {
  const { accessToken, logout } = useAuth();

  const axiosClient = axios.create({
    baseURL: env.API_URL || 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        logout();
      }

      if (error.response?.status === 403) {
        toast.error('Você não tem permissão para fazer isso');
      }

      return Promise.reject(error);
    }
  );

  return axiosClient;
}
