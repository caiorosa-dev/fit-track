import { WorkoutSession } from '@/types/Workout';
import { useApiRoute } from '../lib/use-api-route';

type UseWorkoutSessionHookReturn = {
  session: WorkoutSession;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useWorkoutSession(workoutSessionId?: number): UseWorkoutSessionHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['workout-sessions', workoutSessionId?.toString() ?? '']);

  return {
    session: data ?? {},
    isLoading,
    isFetching,
    error,
  };
}
