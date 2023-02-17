import { PrismaClient } from '@prisma/client';

export default class PublicEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    { page, limit }: { page: number; limit: number },
  ) => {
    const whereFilter = {
      AND: [{ approvedStatus: 1 }, { archived: false }],
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
        approvedStatus: 1,
      },
    });

    await tenantPrisma.$disconnect();

    return event;
  };

  static joinEvent = async (
    tenantPrisma: PrismaClient,
    { eventId, userId }: { eventId: string; userId: string },
  ) => {
    const event = await tenantPrisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event || event?.approvedStatus !== 1) {
      throw new Error('404 not found event');
    }

    const existedParticipant = await tenantPrisma.eventParticipant.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    if (existedParticipant) {
      return existedParticipant;
    }

    const participant = await tenantPrisma.eventParticipant.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        participantInformation: {
          connect: {
            userId: userId,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return participant;
  };
}
