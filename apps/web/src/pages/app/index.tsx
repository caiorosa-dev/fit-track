import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMe } from "@/hooks/api/use-me";
import { Header } from "@/components/layout/header";
import { Button, ButtonIcon } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DefaultLayout } from '@/components/layout/default-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { useWorkouts } from '@/hooks/api/use-workouts';
import { WorkoutCard } from '@/components/misc/workout-card';
import { useWorkoutSessions } from '@/hooks/api/use-workout-sessions';
import { isSameDay } from 'date-fns';
import { useApi } from '@/hooks/lib/use-api';
import { useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute("/app/")({
  component: AppHomePage,
});

function AppHomePage() {
  const api = useApi();
  const navigate = useNavigate();

  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const { user, isLoading } = useMe();
  const { workouts, isLoading: isLoadingWorkouts } = useWorkouts();

  const todayWorkout = workouts.find(workout => workout.weekday === new Date().getDay());

  const { sessions, isLoading: isLoadingWorkoutSessions } = useWorkoutSessions(todayWorkout?.id);

  const todaySession = sessions.find(session => isSameDay(session.createdAt, new Date()));

  const hasWorkouts = workouts.length > 0;

  async function handleCreateSession() {
    try {
      setIsCreatingSession(true);
      const session = await api.post('/workout-sessions', { workoutId: todayWorkout?.id });

      navigate({ to: '/app/workouts/sessions/$id', params: { id: session.data.id } });
    } catch (error) {
      console.error(error);
      toast.error('Erro ao inciar um treino');
    } finally {
      setIsCreatingSession(false);
      toast.success('Treino iniciado com sucesso');
    }
  }

  return (
    <ProtectedRoute>
      <DefaultLayout isLoading={isLoading || isLoadingWorkouts || isLoadingWorkoutSessions}>
        <Header hideBackButton>
          <div>
            <p className="text-muted-foreground text-sm">Bem-vindo,</p>
            <h1>{user?.name ?? "Usuário"}</h1>
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
              <WorkoutCard workout={todayWorkout}>
                {todaySession && (
                  <Link className='w-full' to={`/app/workouts/sessions/${todaySession.id}`}>
                    <Button className='w-full'>
                      <ButtonIcon icon={PlayIcon} />
                      Continuar treino
                    </Button>
                  </Link>
                )}
                {!todaySession && (
                  <Button onClick={handleCreateSession} disabled={isCreatingSession} className='w-full'>
                    <ButtonIcon icon={PlayIcon} isLoading={isCreatingSession} />
                    {isCreatingSession ? 'Iniciando...' : 'Iniciar treino'}
                  </Button>
                )}
              </WorkoutCard>
            </div>
          )}
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
