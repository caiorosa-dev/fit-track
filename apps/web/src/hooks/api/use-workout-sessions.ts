import { WorkoutSession } from '@/types/Workout';
import { useApiRoute } from '../lib/use-api-route';

type UseWorkoutSessionsHookReturn = {
  sessions: WorkoutSession[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useWorkoutSessions(workoutId?: number): UseWorkoutSessionsHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['workout-sessions', workoutId?.toString() ?? '']);

  return {
    sessions: data ?? [],
    isLoading,
    isFetching,
    error,
  };
}
