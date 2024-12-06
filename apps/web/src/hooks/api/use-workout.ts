import { Workout } from '@/types/Workout';
import { useApiRoute } from '../lib/use-api-route';

type UseWorkoutHookReturn = {
  workout: Workout | null;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useWorkout(id: string): UseWorkoutHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['workouts', id]);

  return {
    workout: data,
    isLoading,
    isFetching,
    error,
  };
}
