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

@Controller('workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

    @Post()
  async createWorkout(@Body() data: Prisma.WorkoutCreateInput) {
    return this.workoutService.createWorkout(data);
  }

    @Get(':id')
    async getWorkoutById(@Param('id', ParseIntPipe) id: number) { 
      return this.workoutService.getWorkoutById(id);
    }

    @Put('id')
    async updateWorkout(@Param('id', ParseIntPipe) id: number, @Body() data: Prisma.WorkoutUpdateInput,) {
      return this.workoutService.updateWorkout(id, data);
    }

    @Delete(':id')
    async deleteWorkout(@Param('id', ParseIntPipe) id: number) {
      return this.workoutService.deleteWorkout(id);
    }
}