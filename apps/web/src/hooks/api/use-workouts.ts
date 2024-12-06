import { Workout } from '@/types/Workout';
import { useApiRoute } from '../lib/use-api-route';

type UseWorkoutsHookReturn = {
  workouts: Workout[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useWorkouts(): UseWorkoutsHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['workouts']);

  return {
    workouts: data ?? [],
    isLoading,
    isFetching,
    error,
  };
}
