import { IsInt, IsPositive, IsDecimal, IsOptional } from 'class-validator';

export class CreateExerciseLogDto {
  @IsInt()
  workoutSessionId: number;

  @IsInt()
  exerciseId: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  sets?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  repetitions?: number;

  @IsDecimal()
  @IsPositive()
  @IsOptional()
  weight?: number;
}
