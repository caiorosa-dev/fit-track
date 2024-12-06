import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { WorkoutSession } from '@prisma/client';

@Injectable()
export class WorkoutSessionService {
  constructor(private readonly prisma: PrismaService) { }

  async create(workoutId: number): Promise<WorkoutSession> {
    // SQL: INSERT INTO workout_session (workout_id) VALUES (<workoutId>);
    return this.prisma.workoutSession.create({
      data: {
        workoutId,
      },
    });
  }

  async findAllByUserId(userId: number): Promise<WorkoutSession[]> {
    // SQL: SELECT * FROM workout_session WHERE workout_id IN (SELECT id FROM workout WHERE user_id = <userId>) ORDER BY createdAt DESC;
    return this.prisma.workoutSession.findMany({
      where: {
        workout: {
          userId,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAllByWorkoutId(workoutId: number): Promise<WorkoutSession[]> {
    // SQL: SELECT * FROM workout_session WHERE workout_id = <workoutId> ORDER BY createdAt DESC;
    return this.prisma.workoutSession.findMany({
      where: {
        workoutId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number): Promise<WorkoutSession | null> {
    // SQL: SELECT workout_session.*, workout.*, exercise_log.*, exercise.name, exercise.type, exercise.description
    // FROM workout_session
    // LEFT JOIN workout ON workout_session.workout_id = workout.id
    // LEFT JOIN exercise_log ON workout_session.id = exercise_log.workout_session_id
    // LEFT JOIN exercise ON exercise_log.exercise_id = exercise.id
    // WHERE workout_session.id = <id>;
    return this.prisma.workoutSession.findUnique({
      where: {
        id,
      },
      include: {
        workout: true,
        exercises_logs: {
          include: {
            exercise: {
              select: {
                name: true,
                type: true,
                description: true,
              },
            },
          },
        },
      },
    });
  }

  async delete(id: number): Promise<WorkoutSession> {
    // SQL: DELETE FROM workout_session WHERE id = <id>;
    return this.prisma.workoutSession.delete({
      where: { id },
    });
  }
}
