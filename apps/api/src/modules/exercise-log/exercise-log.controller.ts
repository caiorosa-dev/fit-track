import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ExerciseLogService } from './exercise-log.service';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';

@Controller('exercise-logs')
export class ExerciseLogController {
  constructor(private readonly exerciseLogService: ExerciseLogService) {}

  @Post()
  async create(@Body() createExerciseLogDto: CreateExerciseLogDto) {
    return this.exerciseLogService.create(createExerciseLogDto);
  }

  @Get('workout-session/:sessionId')
  async findByWorkoutSession(@Param('sessionId') sessionId: number) {
    return this.exerciseLogService.findByWorkoutSession(sessionId);
  }
}
