import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Workout, Prisma } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto'; 

@Injectable()
export class WorkoutService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWorkoutDto): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        name: data.name,
        description: data.description,
        weekday: data.weekday, 
        exercises: {
          connect: data.exercises.map((exerciseId) => ({ id: exerciseId })),
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

  async update(id: number, data: Prisma.WorkoutUpdateInput): Promise<Workout> {
    return this.prisma.workout.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Workout> {
    return this.prisma.workout.delete({
      where: { id },
    });
  }
}