import { WorkoutExercise } from '@/types/Workout';
import { useApiRoute } from '../lib/use-api-route';

type UseWorkoutExercisesHookReturn = {
  exercises: WorkoutExercise[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
};

export function useWorkoutExercises(workoutId?: number): UseWorkoutExercisesHookReturn {
  const { data, isLoading, isFetching, error } = useApiRoute(['workout-exercise', workoutId?.toString() ?? '']);

  return {
    exercises: data ?? [],
    isLoading,
    isFetching,
    error,
  };
}
