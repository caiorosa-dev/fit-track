import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { DefaultLayout } from '@/components/layout/default-layout';
import { useWorkouts } from '@/hooks/api/use-workouts';
import { WorkoutCard } from '@/components/misc/workout-card';

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
              <WorkoutCard key={workout.id} workout={workout} />
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
