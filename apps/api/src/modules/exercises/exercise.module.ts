import { Module } from "@nestjs/common";
import { ExercisesController } from "./exercise.controller";
import { ExercisesService } from "./exercise.service";

@Module({
    controllers: [ExercisesController],
    providers: [ExercisesService],
    exports: [ExercisesService],
})
export class ExercisesModule {}