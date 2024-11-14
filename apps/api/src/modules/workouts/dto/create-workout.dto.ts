import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsInt } from "class-validator";

export class CreateWorkoutDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    weekday: number;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true})
    exercises: number[];
}