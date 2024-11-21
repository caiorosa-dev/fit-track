import { IsInt, IsPositive, IsDecimal, IsOptional } from 'class-validator';

export class CreateExerciseLogDto {
  @IsInt()
  workoutSessionId: number;

  @IsInt()
  exerciseId: number;

  @IsInt()
  @IsPositive()
  sets: number;

  @IsInt()
  @IsPositive()
  repetitions: number;

  @IsDecimal()
  weight: number;

  @IsOptional()
  createdAt?: Date;
}
