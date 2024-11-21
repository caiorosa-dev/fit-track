import { IsInt, Min } from "class-validator";

export class CreateWorkoutExerciseDto {
  @IsInt()
  workoutId: number;

  @IsInt()
  exerciseId: number;

  @IsInt()
  @Min(0)
  order: number;
}
