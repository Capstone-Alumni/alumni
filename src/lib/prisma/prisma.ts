import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Unreachable code error
BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  // eslint-disable-next-line no-var
  var prismaClientMapper: { [key: string]: PrismaClient };
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}
global.prismaClientMapper = {};

const getPrismaClient = async (tenantId: string): Promise<PrismaClient> => {
  if (global.prismaClientMapper[tenantId]) {
    return global.prismaClientMapper[tenantId];
  }

  const newPrismaClient = await new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.BASE_DATABASE_URL}?schema=${tenantId}`,
      },
    },
    log: ['query'],
  });
  await newPrismaClient.$disconnect();

  global.prismaClientMapper[tenantId] = newPrismaClient;

  return newPrismaClient;
};

export default getPrismaClient;

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
