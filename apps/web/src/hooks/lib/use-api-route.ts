import { useQuery } from '@tanstack/react-query';
import { useApi } from './use-api';

export function useApiRoute(endpoint: string[]) {
  const api = useApi();

  return useQuery({
    queryKey: [...endpoint],
    queryFn: async () => {
      const response = await api.get(`${endpoint.join('/')}`);

      return response.data;
    },
  });
}
