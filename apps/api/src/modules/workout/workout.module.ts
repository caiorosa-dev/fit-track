import { Module } from "@nestjs/common";
import { WorkoutsService } from "./workout.service";
import { WorkoutsController } from "./workout.controller";

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule { }
