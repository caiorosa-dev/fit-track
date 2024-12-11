import { createFileRoute, useParams } from '@tanstack/react-router';
import { DefaultLayout } from '@/components/layout/default-layout';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/layout/header';
import { useWorkoutSession } from '@/hooks/api/use-workout-session';
import { ExerciseCard } from '@/components/misc/exercise-card';
import { useWorkoutExercises } from '@/hooks/api/use-workout-exercises';
import { AddExerciseLogDialog } from '@/components/misc/add-exercise-log-dialog';
import { Exercise } from '@/types/Exercise';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/lib/use-api';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/app/workouts/sessions/$id/')({
  component: WorkoutSessionPage,
});

function getCompletionData(exercise: Exercise, session: any) {
  return session?.exercises_logs.find((log) => log.exerciseId === exercise.id);
}

function WorkoutSessionPage() {
  const { id } = useParams({ from: '/app/workouts/sessions/$id/' });

  const { session, isLoading } = useWorkoutSession(Number(id));
  const { exercises, isLoading: isLoadingExercises } = useWorkoutExercises(session?.workoutId ?? 0);
  const [allExercisesCompleted, setAllExercisesCompleted] = useState(false);
  const api = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (session && exercises) {
      const allCompleted = exercises.every((exercise) =>
        session.exercises_logs.some((log) => log.exerciseId === exercise.id && log.completed)
      );
      setAllExercisesCompleted(allCompleted);
    }
  }, [session, exercises]);

  async function handleFinishWorkout() {
    try {
      await api.post(`/workout-sessions/${id}/finish`);
      navigate('/app');
      toast.success('Treino finalizado com sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao finalizar o treino');
    }
  }

  return (
    <ProtectedRoute>
      <DefaultLayout isLoading={isLoading || isLoadingExercises}>
        <Header backUrl='/app'>
          <div>
            <p className="text-muted-foreground text-sm">Sessão de treino</p>
            <h1>{session?.workout?.name ?? "Treino"}</h1>
          </div>
        </Header>
        <div className="p-4">
          <h1 className="text-secondary-foreground mb-6">Exercícios do Treino</h1>
          <div className='flex flex-col gap-3'>
            {exercises?.map((workoutExercise) => (
              <AddExerciseLogDialog key={workoutExercise.id} sessionId={id} exercise={workoutExercise.exercise}>
                <ExerciseCard exercise={workoutExercise.exercise} completionData={getCompletionData(workoutExercise.exercise, session)} />
              </AddExerciseLogDialog>
            ))}
          </div>
          <Button className="mt-6" onClick={handleFinishWorkout} disabled={!allExercisesCompleted}>
            Finalizar Treino
          </Button>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}

export default WorkoutSessionPage;
