import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { ExerciseLogService } from './exercise-log.service';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';
import { UpdateExerciseLogDto } from './dto/update-exercise-log.dto';

@Controller('exercise-logs')
export class ExerciseLogController {
  constructor(private readonly exerciseLogService: ExerciseLogService) { }

  @Post()
  async create(@Body() createExerciseLogDto: CreateExerciseLogDto) {
    return this.exerciseLogService.create(createExerciseLogDto);
  }

  @Get('workout-session/:sessionId')
  async findByWorkoutSession(@Param('sessionId') sessionId: number) {
    return this.exerciseLogService.findByWorkoutSession(sessionId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.exerciseLogService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateExerciseLogDto: UpdateExerciseLogDto) {
    return this.exerciseLogService.update(id, updateExerciseLogDto);
  }
}
