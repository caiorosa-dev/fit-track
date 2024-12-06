import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Button, ButtonIcon } from "@/components/ui/button";
import { DefaultLayout } from '@/components/layout/default-layout';
import { useWorkouts } from '@/hooks/api/use-workouts';
import { ExerciseCard } from '@/components/misc/exercise-card';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { WEEKDAYS } from '@/lib/week-days';
export const Route = createFileRoute("/app/workouts/")({
  component: WeeklyWorkoutsPage,
});

function WeeklyWorkoutsPage() {
  const { workouts, isLoading } = useWorkouts();

  const hasWorkouts = workouts.length > 0;

  return (
    <DefaultLayout isLoading={isLoading}>
      <Header hideBackButton>
        <h1>Seus treinos</h1>
      </Header>
      <main className='self-center flex flex-col gap-8'>
        {workouts.length > 0 ? (
          <div className="flex flex-col gap-4">
            {workouts.sort((a, b) => a.weekday - b.weekday).map((workout) => (
              <Card key={workout.id}>
                <CardHeader className='flex-row justify-between items-center'>
                  <CardTitle>{workout.name}</CardTitle>
                  <p className='text-sm text-secondary-foreground'>{WEEKDAYS[workout.weekday - 1]}</p>
                </CardHeader>
                <CardContent>
                  {workout.workoutExercises.map((exercise) => (
                    <ExerciseCard key={exercise.id} exercise={exercise.exercise} />
                  ))}
                  {workout.workoutExercises.length === 0 && (
                    <CardDescription>
                      Nenhum exercício adicionado ainda.
                    </CardDescription>
                  )}
                </CardContent>
                <CardFooter className='flex gap-3'>
                  <Button size='sm'>
                    <ButtonIcon icon={Play} />
                    Adicionar sessão
                  </Button>
                  <Link to="/app/workouts/$id" params={{ id: workout.id.toString() }}>
                    <Button size='sm' variant='accent'>
                      Modificar treino
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <p>Nenhum treino foi criado ainda.</p>
        )}
        <Link to="/app/workouts/new">
          <Button className='w-full' variant={hasWorkouts ? "accent" : "default"}>
            Criar novo treino
          </Button>
        </Link>
      </main>
    </DefaultLayout>
  );
}
