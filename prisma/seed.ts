import { PrismaClient } from '@prisma/client';
import { ADMIN_ROLE, USER_ROLE } from './shareData';
const prisma = new PrismaClient();

async function initInsertRoles() {
  await prisma.role.createMany({
    data: [ADMIN_ROLE, USER_ROLE],
  });
}

initInsertRoles()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
