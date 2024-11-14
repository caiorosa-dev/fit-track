import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { Exercise, ExerciseType, Prisma } from '@prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) { }

  async findAll(filters: Prisma.ExerciseWhereInput): Promise<Exercise[]> {
    return this.prisma.exercise.findMany({ where: filters });
  }

  async findByType(type: ExerciseType): Promise<Exercise | null> {
    return this.prisma.exercise.findFirst({ where: { type } });
  }
}
