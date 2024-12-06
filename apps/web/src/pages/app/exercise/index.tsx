import { createFileRoute } from '@tanstack/react-router';
import { DefaultLayout } from '@/components/layout/default-layout';
import { Exercise, ExerciseType } from '@/types/Exercise';
import { useExercises } from '@/hooks/api/use-exercises';
import { EXERCISE_TYPE_VARIANTS, ExerciseCard } from '@/components/misc/exercise-card';
import { Header } from '@/components/layout/header';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import React from 'react';
import { AddExerciseToWorkoutDialog } from '@/components/misc/add-exercise-to-workout-dialog';
import { useWorkouts } from '@/hooks/api/use-workouts';

export const Route = createFileRoute('/app/exercise/')({
  component: ExercisesPage,
});

const EXERCISE_TYPE_NAMES: Record<ExerciseType, string> = {
  CHEST: 'Peito',
  BACK: 'Costas',
  SHOULDERS: 'Ombros',
  BICEPS: 'Bíceps',
  TRICEPS: 'Tríceps',
  LEGS: 'Pernas',
  ABS: 'Abdominais',
  CARDIO: 'Cardio',
  GLUTEOS: 'Glúteos',
};

function ExercisesPage() {
  const { exercises, isLoading } = useExercises();
  const { workouts } = useWorkouts();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExerciseType | 'ALL'>('ALL');

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'ALL' || exercise.type === selectedType;
    return matchesSearch && matchesType;
  });

  const groupedExercises = filteredExercises.reduce((acc: Record<ExerciseType, Exercise[]>, exercise: Exercise) => {
    if (!acc[exercise.type]) {
      acc[exercise.type] = [];
    }
    acc[exercise.type].push(exercise);
    return acc;
  }, {} as Record<ExerciseType, Exercise[]>);

  return (
    <DefaultLayout isLoading={isLoading}>
      <Header hideBackButton>
        <h1>Exercicios disponíveis</h1>
      </Header>
      <section className='self-center'>
        <div className='flex gap-4 mb-4'>
          <Input
            type='text'
            placeholder='Pesquise por um exercício...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ExerciseType | 'ALL')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos</SelectItem>
              {Object.entries(EXERCISE_TYPE_NAMES).map(([type, name]) => (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    {React.createElement(EXERCISE_TYPE_VARIANTS[type as ExerciseType].icon, { className: cn('w-4 h-4', EXERCISE_TYPE_VARIANTS[type as ExerciseType].iconColor) })}
                    <span className='text-sm font-medium'>{name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <main className='overflow-auto max-h-[calc(100vh-15rem)] mt-4 flex flex-col gap-6'>
          {Object.entries(groupedExercises).map(([type, exercises]) => (
            <div key={type} className='flex flex-col gap-4'>
              <h2 className='text-lg font-semibold'>{EXERCISE_TYPE_NAMES[type as ExerciseType]}</h2>
              <div className='flex flex-col gap-3'>
                {exercises.map((exercise) => (
                  <AddExerciseToWorkoutDialog key={exercise.id} exercise={exercise} workouts={workouts}>
                    <ExerciseCard exercise={exercise} />
                  </AddExerciseToWorkoutDialog>
                ))}
              </div>
            </div>
          ))}
        </main>
      </section>
    </DefaultLayout>
  );
}
