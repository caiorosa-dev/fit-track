import { ExerciseLog } from '@/types/ExerciseLog';
import { useApiRoute } from '../lib/use-api-route';

type UseExerciseLogsHookReturn = {
  logs: ExerciseLog[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useExerciseLogs(sessionId?: number): UseExerciseLogsHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['exercise-logs', sessionId?.toString() ?? '']);

  return {
    logs: data ?? [],
    isLoading,
    isFetching,
    error,
  };
}
