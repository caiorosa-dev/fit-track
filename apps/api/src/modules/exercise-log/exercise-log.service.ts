import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateExerciseLogDto } from './dto/create-exercise-log.dto';

@Injectable()
export class ExerciseLogService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExerciseLogDto: CreateExerciseLogDto) {
    return this.prisma.exercise_Log.create({
      data: createExerciseLogDto,
    });
  }

  async findByWorkoutSession(sessionId: number) {
    return this.prisma.exercise_Log.findMany({
      where: { workoutSessionId: sessionId },
      include: {
        exercise: true,
      },
    });
  }
}
