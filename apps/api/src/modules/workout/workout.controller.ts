import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException
} from '@nestjs/common';
import { WorkoutsService } from './workout.service';
import { Prisma } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { AuthenticatedUser } from 'src/shared/decorators/authenticated-user.decorator';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutService: WorkoutsService) { }

  @Post()
  async create(@AuthenticatedUser() user: AuthenticatedUser, @Body() createWorkoutDto: CreateWorkoutDto) {
    return this.workoutService.create(createWorkoutDto, user.id);
  }

  @Get(':id')
  async getById(@AuthenticatedUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number) {
    const workout = await this.workoutService.findOne(id);

    if (workout && workout.userId !== user.id) {
      throw new NotFoundException();
    }

    return workout;
  }

  @Put('id')
  async update(@AuthenticatedUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number, @Body() data: Prisma.WorkoutUpdateInput) {
    const workout = await this.workoutService.findOne(id);

    if (workout && workout.userId !== user.id) {
      throw new NotFoundException();
    }

    return this.workoutService.update(id, data);
  }

  @Delete(':id')
  async delete(@AuthenticatedUser() user: AuthenticatedUser, @Param('id', ParseIntPipe) id: number) {
    const workout = await this.workoutService.findOne(id);

    if (workout && workout.userId !== user.id) {
      throw new NotFoundException();
    }

    return this.workoutService.delete(id);
  }
}
