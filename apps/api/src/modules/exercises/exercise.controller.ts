import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';
import { ExercisesService } from './exercise.service';

@Controller('exercise')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    @Get(':type')
    async getExerciseByType(@Param('type') type: string) {
        return this.exercisesService.findByType(type);
    }
}