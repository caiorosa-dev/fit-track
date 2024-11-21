import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';
import { UpdateExerciseLogDto } from './dto/update-exercise-log.dto';

@Injectable()
export class ExerciseLogService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createExerciseLogDto: CreateExerciseLogDto) {
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
    return this.prisma.exerciseLog.findMany({
      where: { workoutSessionId: sessionId },
      include: {
        exercise: true,
      },
    });
  }

  async delete(id: number) {
    return this.prisma.exerciseLog.delete({
      where: { id },
    });
  }

  async update(id: number, updateExerciseLogDto: UpdateExerciseLogDto) {
    return this.prisma.exerciseLog.update({
      where: { id },
      data: updateExerciseLogDto,
    });
  }
}
