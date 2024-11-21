import { Controller, Get, Post, Param, Delete, Body } from "@nestjs/common";
import { WorkoutSessionService } from "./workout-session.service";
import { AuthenticatedUser } from 'src/shared/decorators/authenticated-user.decorator';

@Controller('workout-sessions')
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) { }

  @Get()
  async getAll(@AuthenticatedUser() auth: AuthenticatedUser) {
    return this.workoutSessionService.findAllByUserId(auth.id);
  }

  @Post()
  async create(@Body('workoutId') workoutId: number) {
    return this.workoutSessionService.create(workoutId);
  }

  @Get(':workoutId')
  async getAllByWorkoutId(@Param('workoutId') workoutId: number) {
    return this.workoutSessionService.findAllByWorkoutId(workoutId);
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.workoutSessionService.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.workoutSessionService.delete(id);
  }
}
