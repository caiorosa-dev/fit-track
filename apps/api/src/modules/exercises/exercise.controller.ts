import {
    Controller,
    Get,
    Query,
    BadRequestException,
} from '@nestjs/common';
import { ExercisesService } from './exercise.service';

@Controller('exercise')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    @Get()
    async findAll(@Query() filters: any) {
        if(filters.type && typeof filters.type !== 'string') {
            throw new BadRequestException('O tipo deve ser uma string');
        }

        if(filters.level && typeof filters.level !== 'string') {
            throw new BadRequestException('O nível deve ser uma string');
        }

        return this.exercisesService.findAll(filters);
    }
}