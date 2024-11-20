import { Module } from '@nestjs/common';
import { ExerciseLogController } from './exercise-log.controller';
import { ExerciseLogService } from './exercise-log.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  controllers: [ExerciseLogController],
  providers: [ExerciseLogService, PrismaService],
})
export class ExerciseLogModule {}
