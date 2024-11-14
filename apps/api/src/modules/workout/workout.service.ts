import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Workout, Prisma } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateWorkoutDto, userId: number): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        name: data.name,
        weekday: data.weekday,
        user: {
          connect: {
            id: userId,
          },
        },
        workoutExercises: {
          create: data.exercises.map((exerciseData) => ({ ...exerciseData })),
        },
      },
    });
  }

  async findAll(): Promise<Workout[]> {
    return this.prisma.workout.findMany();
  }

  async findOne(id: number): Promise<Workout | null> {
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

  async findUserWorkouts(userId: number): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
