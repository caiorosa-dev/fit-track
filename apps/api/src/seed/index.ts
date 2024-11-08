import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // TODO: Colocar um seed para popular os exercícios bases
}

export async function runDatabaseSeed() {
  await seed();

  console.log('Database seeded successfully :)');
}

runDatabaseSeed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
