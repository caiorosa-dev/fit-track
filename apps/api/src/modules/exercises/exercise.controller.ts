import {
    Controller,
    Get,
} from '@nestjs/common';
import { ExercisesService } from './exercise.service';

@Controller('exercise')
export class ExercisesController {
    constructor(private readonly exercisesService: ExercisesService) {}

    //todo:type = 'pe' - vai pegar do type 
    //@Get('pe') pensar melhor?
    //pe() tá estranho isso aq :|
}