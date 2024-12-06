export type ExerciseType =
  | "CHEST"
  | "BACK"
  | "SHOULDERS"
  | "BICEPS"
  | "TRICEPS"
  | "LEGS"
  | "ABS"
  | "CARDIO"
  | "GLUTEOS";

export type Exercise = {
  id: number;
  name: string;
  description: string;
  type: ExerciseType;
};
