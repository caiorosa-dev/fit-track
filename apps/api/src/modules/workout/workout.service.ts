import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { Workout, Prisma } from '@prisma/client';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateWorkoutDto, userId: number): Promise<Workout> {
    // SQL: INSERT INTO workout (name, weekday, user_id) VALUES (<name>, <weekday>, <userId>);
    // For each exercise in data.exercises, INSERT INTO workout_exercise (order, workout_id, exercise_id) VALUES (<order>, <workoutId>, <exerciseId>);
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

  async findUserWorkouts(userId: number): Promise<Workout[]> {
    // SQL: SELECT * FROM workout WHERE user_id = <userId> ORDER BY createdAt DESC;
    return this.prisma.workout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Workout | null> {
    // SQL: SELECT * FROM workout WHERE id = <id>;
    return this.prisma.workout.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: Prisma.WorkoutUpdateInput): Promise<Workout> {
    // SQL: UPDATE workout SET <fields> WHERE id = <id>;
    return this.prisma.workout.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Workout> {
    // SQL: DELETE FROM workout WHERE id = <id>;
    return this.prisma.workout.delete({
      where: { id },
    });
  }
}
