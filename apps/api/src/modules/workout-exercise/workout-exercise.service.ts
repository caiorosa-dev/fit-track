import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(workoutId: number, exerciseId: number, order: number) {
    return this.prisma.workout_Exercise.create({
      data: {
        workoutId,
        exerciseId,
        order,
      }
    });
  }

  async findByWorkout(workoutId: number) {
    return this.prisma.workout_Exercise.findMany({
      where: { workoutId },
      include: { exercise: true },
    });
  }

  async delete(id: number) {
    return this.prisma.workout_Exercise.delete({
      where: { id },
    });
  }
}
