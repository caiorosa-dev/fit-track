import { Module } from "@nestjs/common";
import { WorkoutsService } from "./workout.service";
import { WorkoutsController } from "./workout.controller";
import { PrismaService } from "src/shared/prisma/prisma.service";

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService, PrismaService],
})
export class WorkoutsModule { }
