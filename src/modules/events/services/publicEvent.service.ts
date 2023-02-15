import { PrismaClient } from '@prisma/client';

export default class PublicEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    { page, limit }: { page: number; limit: number },
  ) => {
    const whereFilter = {
      AND: [{ isApproved: true }, { archived: false }],
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.event.count({
        where: whereFilter,
      }),
      tenantPrisma.event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalItems,
      items,
      itemPerPage: limit,
    };
  };

  static getById = async (
    tenantPrisma: PrismaClient,
    { eventId }: { eventId: string },
  ) => {
    const event = await tenantPrisma.event.findFirst({
      where: {
        id: eventId,
        isApproved: true,
      },
    });

    await tenantPrisma.$disconnect();

    return event;
  };
}
