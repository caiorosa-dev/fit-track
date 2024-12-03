import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';

@Injectable()
export class WorkoutExerciseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateWorkoutExerciseDto) {
    // SQL: INSERT INTO workout_exercise (workout_id, exercise_id, order) VALUES (<workoutId>, <exerciseId>, <order>);
    return this.prisma.workoutExercise.create({
      data: {
        workoutId: dto.workoutId,
        exerciseId: dto.exerciseId,
        order: dto.order,
      },
    });
  }

  async findByWorkout(workoutId: number) {
    // SQL: SELECT * FROM workout_exercise WHERE workout_id = <workoutId>;
    return this.prisma.workoutExercise.findMany({
      where: { workoutId },
      include: {
        exercise: true,
      },
    });
  }

  async delete(id: number) {
    // SQL: DELETE FROM workout_exercise WHERE id = <id>;
    return this.prisma.workoutExercise.delete({
      where: { id },
    });
  }
}
