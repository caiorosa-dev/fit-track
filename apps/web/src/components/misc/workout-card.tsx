import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from "@tanstack/react-router";
import { ExerciseCard } from '@/components/misc/exercise-card';
import { WEEKDAYS } from '@/lib/week-days';
import { Workout } from '@/types/Workout';

export function WorkoutCard({ workout }: { workout: Workout }) {
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
        {workout.workoutExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise.exercise} />
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
