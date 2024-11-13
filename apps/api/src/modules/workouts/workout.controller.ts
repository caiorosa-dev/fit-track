import {
  Controller,
  Get,
  Post,
  Put, 
  Delete,
  Param,
  Body,
  ParseIntPipe
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Prisma } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.createWorkout(createWorkoutDto);
  }

  @Get(':id')
  async getWorkoutById(@Param('id', ParseIntPipe) id: number) { 
    return this.workoutService.getWorkoutById(id);
  }

  @Put('id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() data: Prisma.WorkoutUpdateInput,) {
    return this.workoutService.updateWorkout(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.workoutService.deleteWorkout(id);
  }
}