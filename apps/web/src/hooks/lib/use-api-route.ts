import { useQuery } from '@tanstack/react-query';
import { useApi } from './use-api';

export function useApiRoute(endpoint: string[]) {
  const api = useApi();

  return useQuery({
    queryKey: [...endpoint],
    refetchInterval: 1000 * 30,
    queryFn: async () => {
      const response = await api.get(`${endpoint.join('/')}`);

      return response.data;
    },
  });
}
