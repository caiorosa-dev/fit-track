import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ArrayNotEmpty, IsInt } from "class-validator";

export class CreateWorkoutDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true})
    exercises: number[];
}