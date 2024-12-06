import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from "@tanstack/react-router";
import { ExerciseCard } from '@/components/misc/exercise-card';
import { WEEKDAYS } from '@/lib/week-days';
import { Workout, WorkoutExercise } from '@/types/Workout';
import { useApi } from '@/hooks/lib/use-api';
import { useQueryClient } from '@tanstack/react-query';

export function WorkoutCard({ workout }: { workout: Workout }) {
  const api = useApi();
  const queryClient = useQueryClient();

  async function handleClickOnExercise(workoutExercise: WorkoutExercise) {
    const proceed = confirm(`Tem certeza que deseja remover o exercício ${workoutExercise.exercise.name} do treino?`);

    if (proceed) {
      await api.delete(`/workout-exercise/${workoutExercise.id}`);
      queryClient.invalidateQueries({ queryKey: ['workouts'] });
    }
  }

  return (
    <Card key={workout.id}>
      <CardHeader className='flex-row justify-between items-center'>
        <CardTitle>{workout.name}</CardTitle>
        <div className='flex items-center gap-3'>
          <p className='text-sm text-secondary-foreground'>{WEEKDAYS[workout.weekday - 1]}</p>
          <Link to="/app/workouts/$id" params={{ id: workout.id.toString() }}>
            <Button size='sm' variant='accent'>
              Modificar treino
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className='space-y-3'>
        {workout.workoutExercises.map((workoutExercise) => (
          <ExerciseCard onClick={() => handleClickOnExercise(workoutExercise)} key={workoutExercise.exerciseId} exercise={workoutExercise.exercise} />
        ))}
        {workout.workoutExercises.length === 0 && (
          <CardDescription>
            Nenhum exercício adicionado ainda.
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
