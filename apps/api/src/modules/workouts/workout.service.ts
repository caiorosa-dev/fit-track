import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { Workout, Prisma } from "@prisma/client";
import { PrismaModule } from "src/shared/prisma/prisma.module";

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkout(data: Prisma.WorkoutCreateInput): Promise<Workout> {
    return this.prisma.workout.create({
      data,
    });
  }

  async getAllWorkouts(): Promise<Workout[]> {
    return this.prisma.workout.findMany();
  }

  async getWorkoutById(id: number): Promise<Workout | null> {
    return this.prisma.workout.findUnique({
      where: { id },
    });
  }

  async updateWorkout(id: number, data: Prisma.WorkoutUpdateInput): Promise<Workout> {
    return this.prisma.workout.update({
      where: { id },
      data,
    });
  }

  async deleteWorkout(id: number): Promise<Workout> {
    return this.prisma.workout.delete({
      where: { id },
    });
  }
}