import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { Workout, Prisma } from "@prisma/client";
import { CreateWorkoutDto } from "./dto/create-workout.dto"; 
import { connect } from "http2";

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async createWorkout(data: Prisma.WorkoutCreateInput): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        exercises: {
          connect: data.workout_exercises.map((exerciseId) => ({ id: exerciseId })),
        },
      },
      include: { exercises: true },
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