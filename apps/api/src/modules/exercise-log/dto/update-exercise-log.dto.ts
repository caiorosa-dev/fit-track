import { IsInt, IsPositive, IsDecimal, IsOptional } from 'class-validator';

export class UpdateExerciseLogDto {
  @IsInt()
  @IsOptional()
  exerciseId?: number;

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
