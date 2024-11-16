import { IsInt, Min } from "class-validator";

export class createWorkoutExerciseDto {
  @IsInt()
  workoutId: number;

  @IsInt()
  exerciseId: number;

  @IsInt()
  @Min(1)
  order: number;
}
