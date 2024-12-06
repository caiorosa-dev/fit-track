import { IsInt, IsPositive, IsOptional, IsNumber } from 'class-validator';

export class CreateExerciseLogDto {
  @IsInt()
  workoutSessionId: number;

  @IsInt()
  exerciseId: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  sets?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  repetitions?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  weight?: number;
}
