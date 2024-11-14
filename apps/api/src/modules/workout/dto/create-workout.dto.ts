import { IsString, IsNotEmpty, IsArray, IsInt } from "class-validator";

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  weekday: number;

  @IsArray()
  exercises: {
    exerciseId: number;
    order: number;
  }[];
}
