import { Module } from "@nestjs/common";
import { WorkoutSessionService } from "./workout-session.service";
import { WorkoutSessionController } from "./workout-session.controller";

@Module({
  controllers: [WorkoutSessionController],
  providers: [WorkoutSessionService],
  exports: [WorkoutSessionService],
})
export class WorkoutSessionModule { }
