import { Module } from '@nestjs/common';
import { ExerciseLogController } from './exercise-log.controller';
import { ExerciseLogService } from './exercise-log.service';

@Module({
  controllers: [ExerciseLogController],
  providers: [ExerciseLogService],
})
export class ExerciseLogModule { }
