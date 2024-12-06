import { Exercise } from './Exercise';
import { ExerciseLog } from './ExerciseLog';

export type WorkoutExercise = {
  id: number;
  order: number;
  workoutId: number;
  exerciseId: number;
  exercise: Exercise;
};

export type Workout = {
  id: number;
  userId: number;
  name: string;
  weekday: number;
  workoutExercises: WorkoutExercise[];
};

export type WorkoutSession = {
  id: number;
  createdAt: Date;
  workoutId: number;
  workout: Workout;

  exercises_logs: ExerciseLog[];
};
