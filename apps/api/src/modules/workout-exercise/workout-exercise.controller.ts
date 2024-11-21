import { Controller, Post, Get, Delete, Param, Body } from "@nestjs/common";
import { WorkoutExerciseService } from "./workout-exercise.service";
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';


@Controller('workout-exercise')
export class WorkoutExerciseController {
  constructor(private readonly workoutExerciseService: WorkoutExerciseService) { }

  @Post()
  async create(@Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
    return this.workoutExerciseService.create(createWorkoutExerciseDto);
  }

  @Get(':workoutId')
  async findByWorkout(@Param('workoutId') workoutId: number) {
    return this.workoutExerciseService.findByWorkout(workoutId);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.workoutExerciseService.delete(id);
  }
}
