import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { Workout_Session, Prisma } from "@prisma/client";

@Injectable()
export class WorkoutSessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkoutSession(workoutId: number): Promise<Workout_Session> {
    return this.prisma.workout_Session.create({
      data: {
        workoutId
      },
    });
  }

  async getAllWorkoutSessions(workoutId: number): Promise<Workout_Session[]> {
    return this.prisma.workout_Session.findMany({
      where: {
        workoutId
      },
      include: {
        exercises_logs: true
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
  }

  async getWorkoutSessionById(id: number): Promise<Workout_Session | null> {
    return this.prisma.workout_Session.findUnique({
      where: {
        id
      },
      include: {
        exercises_logs: true
      },
    });
  }

  async deleteSession(id: number): Promise<Workout_Session> {
    return this.prisma.workout_Session.delete({
      where: { id },
    });
  }
}
