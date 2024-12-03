import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const exercisesPath = path.join(__dirname, 'data', 'exercises.json');
  const exercisesData = JSON.parse(fs.readFileSync(exercisesPath, 'utf-8'));

  const upsertPromises = exercisesData.map((exercise) =>
    prisma.exercise.upsert({
      where: {
        name_type: {
          name: exercise.name,
          type: exercise.type,
        },
      },
      update: {
        description: exercise.description,
      },
      create: {
        name: exercise.name,
        description: exercise.description,
        type: exercise.type,
      },
    })
  );

  await prisma.$transaction(upsertPromises);
}

export async function runDatabaseSeed() {
  await seed();

  console.log('🌿 Database seeded successfully.');
}

runDatabaseSeed()
  .catch(async (e) => {
    console.error(e);
  }).finally(async () => {
    await prisma.$disconnect();
  });
