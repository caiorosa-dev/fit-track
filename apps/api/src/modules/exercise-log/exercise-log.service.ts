import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';
import { UpdateExerciseLogDto } from './dto/update-exercise-log.dto';

@Injectable()
export class ExerciseLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExerciseLogDto: CreateExerciseLogDto) {
    // SQL: INSERT INTO exercise_log (repetitions, sets, weight, workout_session_id, exercise_id) VALUES (<repetitions>, <sets>, <weight>, <workoutSessionId>, <exerciseId>);
    return this.prisma.exerciseLog.create({
      data: {
        repetitions: createExerciseLogDto.repetitions,
        sets: createExerciseLogDto.sets,
        weight: createExerciseLogDto.weight,
        workoutSessionId: createExerciseLogDto.workoutSessionId,
        exerciseId: createExerciseLogDto.exerciseId,
      },
    });
  }

  async findByWorkoutSession(sessionId: number) {
    // SQL: SELECT * FROM exercise_log WHERE workout_session_id = <sessionId>;
    return this.prisma.exerciseLog.findMany({
      where: { workoutSessionId: sessionId },
      include: {
        exercise: true,
      },
    });
  }

  async delete(id: number) {
    // SQL: DELETE FROM exercise_log WHERE id = <id>;
    return this.prisma.exerciseLog.delete({
      where: { id },
    });
  }

  async update(id: number, updateExerciseLogDto: UpdateExerciseLogDto) {
    // SQL: UPDATE exercise_log SET <fields> WHERE id = <id>;
    return this.prisma.exerciseLog.update({
      where: { id },
      data: updateExerciseLogDto,
    });
  }
}
