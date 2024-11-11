import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/shared/prisma/prisma.service";
import { Exercise, Prisma } from '@prisma/client';

@Injectable()
export class ExercisesService {
    constructor(private prisma: PrismaService) {}

    async findAll(filters: { [key: string]: any }): Promise<Exercise[]> {
        return this.prisma.execise.findMany({ where: filters });
    }

    async findByType(type: string): Promise<Exercise | null> {
        return this.prisma.execise.findUnique({ where: { type }}); 
    }
}