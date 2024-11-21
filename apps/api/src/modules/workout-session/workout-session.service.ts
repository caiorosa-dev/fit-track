import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { WorkoutSession } from "@prisma/client";

@Injectable()
export class WorkoutSessionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(workoutId: number): Promise<WorkoutSession> {
    return this.prisma.workoutSession.create({
      data: {
        workoutId
      },
    });
  }

  async findAllByUserId(userId: number): Promise<WorkoutSession[]> {
    return this.prisma.workoutSession.findMany({
      where: {
        workout: {
          userId,
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
  }

  async findAllByWorkoutId(workoutId: number): Promise<WorkoutSession[]> {
    return this.prisma.workoutSession.findMany({
      where: {
        workoutId
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
  }

  async findById(id: number): Promise<WorkoutSession | null> {
    return this.prisma.workoutSession.findUnique({
      where: {
        id
      },
      include: {
        exercises_logs: {
          include: {
            exercise: {
              select: {
                name: true,
                type: true,
                description: true,
              }
            },
          }
        }
      },
    });
  }

  async delete(id: number): Promise<WorkoutSession> {
    return this.prisma.workoutSession.delete({
      where: { id },
    });
  }
}
