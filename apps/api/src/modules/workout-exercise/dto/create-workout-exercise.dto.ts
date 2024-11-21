import { IsInt, Min } from "class-validator";

export class createWorkoutExerciseDto {
  @IsInt()
  workoutSession: number;

  @IsInt()
  exerciseId: number;

  @IsInt()
  @Min(1)
  order: number;
}
