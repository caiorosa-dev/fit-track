import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, IsInt } from "class-validator";

export class CreateWorkoutDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsNotEmpty()
    weekday: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true})
    exercises: number[];
}