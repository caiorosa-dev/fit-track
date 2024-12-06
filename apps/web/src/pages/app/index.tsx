import { createFileRoute } from "@tanstack/react-router";
import { useMe } from "@/hooks/api/use-me";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DefaultLayout } from '@/components/layout/default-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useWorkouts } from '@/hooks/api/use-workouts';
import { WorkoutCard } from '@/components/misc/workout-card';

export const Route = createFileRoute("/app/")({
  component: AppHomePage,
});

function AppHomePage() {
  const { user, isLoading } = useMe();
  const { workouts, isLoading: isLoadingWorkouts } = useWorkouts();

  const todayWorkout = workouts.find(workout => workout.weekday === new Date().getDay());
  const hasWorkouts = workouts.length > 0;

  return (
    <ProtectedRoute>
      <DefaultLayout isLoading={isLoading || isLoadingWorkouts}>
        <Header hideBackButton>
          <div>
            <p className="text-muted-foreground text-sm">Bem-vindo,</p>
            <h1>{user?.name ?? "Usuário"}</h1> {/* Proteção contra undefined */}
          </div>
        </Header>
        <div className="self-center flex-grow flex flex-col items-center justify-center">
          {!hasWorkouts && (
            <div className="text-center">
              <p className="text-secondary-foreground text-lg">Você não possui nenhum treino cadastrado ainda.</p>
              <Link to="/app/workouts/new" className="no-underline">
                <Button className="mt-4">Adicionar novo treino</Button>
              </Link>
            </div>
          )}
          {hasWorkouts && !todayWorkout && (
            <div className="text-center">
              <p className="text-secondary-foreground text-lg">Você não tem nenhum treino para hoje.</p>
              <Link to="/app/workouts">
                <Button className='w-full'>
                  Ver meus treinos
                </Button>
              </Link>
            </div>
          )}
          {todayWorkout && (
            <div className="text-center">
              <p className="text-lg font-semibold mb-6 text-primary">Treino de hoje</p>
              <WorkoutCard workout={todayWorkout} />
            </div>
          )}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
