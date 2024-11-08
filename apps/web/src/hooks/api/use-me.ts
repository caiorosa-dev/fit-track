import { User } from '@/types/User';
import { useApiRoute } from '../lib/use-api-route';

type UseMeHookReturn = {
  user: User;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useMe(): UseMeHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['users', 'me']);

  return {
    user: data,
    isLoading,
    isFetching,
    error,
  };
}
