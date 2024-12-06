import { useApiRoute } from '../lib/use-api-route';
import { Exercise } from '@/types/Exercise';

type UseExercisesHookReturn = {
  exercises: Exercise[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useExercises(): UseExercisesHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['exercises']);

  return {
    exercises: data ?? [],
    isLoading,
    isFetching,
    error,
  };
}
