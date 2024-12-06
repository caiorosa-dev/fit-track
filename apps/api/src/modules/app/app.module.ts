import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../../shared/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../user/user.module';
import { ExercisesModule } from '../exercise/exercise.module';
import { ExerciseLogModule } from '../exercise-log/exercise-log.module';
import { WorkoutsModule } from '../workout/workout.module';
import { WorkoutExerciseModule } from '../workout-exercise/workout-exercise.module';
import { WorkoutSessionModule } from '../workout-session/workout-session.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ExercisesModule,
    ExerciseLogModule,
    WorkoutsModule,
    WorkoutExerciseModule,
    WorkoutSessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
