import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateWorkoutExerciseDto) {
    return this.prisma.workoutExercise.create({
      data: {
        workoutId: dto.workoutId,
        exerciseId: dto.exerciseId,
        order: dto.order,
      }
    });
  }

  async findByWorkout(workoutId: number) {
    return this.prisma.workoutExercise.findMany({
      where: { workoutId },
      include: {
        exercise: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.workoutExercise.delete({
      where: { id },
    });
  }
}
