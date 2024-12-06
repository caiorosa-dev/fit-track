export type ExerciseLog = {
  id: number;
  workoutSessionId: number;
  exerciseId: number;
  sets: number;
  repetitions: number;
  weight: number;
  createdAt: Date;
};
