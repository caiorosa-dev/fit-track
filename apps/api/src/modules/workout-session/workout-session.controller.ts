import { Controller, Get, Post, Param, Body, Delete } from "@nestjs/common";
import { WorkoutSessionService } from "./workout-session.service";

@Controller('workout-sessions')
export class WorkoutSessionController {
  constructor(private readonly workoutSessionService: WorkoutSessionService) {}

  @Post(':workoutId')
  async createWorkoutSession(@Param('workoutId') workoutId: number) {
    return this.workoutSessionService.createWorkoutSession(workoutId);
  }

  @Get(':workoutId')
  async getAllWorkoutSessions(@Param('workoutId') workoutId: number) {
    return this.workoutSessionService.getAllWorkoutSessions(workoutId);
  }

  @Get('session/:id')
  async getWorkoutSessionById(@Param('id') id: number) {
    return this.workoutSessionService.getWorkoutSessionById(id);
  }

  @Delete(':id')
  async deleteSession(@Param('id') id: number) {
    return this.workoutSessionService.deleteSession(id);
  }
}
