import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function initLoad() {
  await prisma.role.createMany({
    data: [
      {
        id: 1,
        roleName: 'ADMIN',
      },
      {
        id: 2,
        roleName: 'USER',
      },
    ],
  });
}

initLoad()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
