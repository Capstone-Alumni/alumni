import { PrismaClient } from '@prisma/client';

export default class PublicEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    { page, limit, userId }: { page: number; limit: number; userId?: string },
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
        include: {
          eventParticipants: {
            where: {
              userId: userId ?? '',
            },
          },
          eventInterests: {
            where: {
              userId: userId ?? '',
            },
          },
          hostInformation: true,
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
    { eventId, userId }: { eventId: string; userId: string },
  ) => {
    const event = await tenantPrisma.event.findFirst({
      where: {
        id: eventId,
        approvedStatus: 1,
      },
      include: {
        eventParticipants: {
          where: {
            userId: userId ?? '',
          },
        },
        eventInterests: {
          where: {
            userId: userId ?? '',
          },
        },
        hostInformation: true,
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

  static getParticipantList = async (
    tenantPrisma: PrismaClient,
    { eventId, page, limit }: { eventId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      eventId: eventId,
      archived: false,
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.eventParticipant.count({
        where: whereFilter,
      }),
      tenantPrisma.eventParticipant.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          participantInformation: {
            include: {
              alumClass: {
                include: {
                  grade: true,
                },
              },
            },
          },
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

  static interestEvent = async (
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

    const existedInterest = await tenantPrisma.eventInterest.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    if (existedInterest) {
      return existedInterest;
    }

    const participant = await tenantPrisma.eventInterest.create({
      data: {
        event: {
          connect: {
            id: eventId,
          },
        },
        userInformation: {
          connect: {
            userId: userId,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return participant;
  };

  static uninterestEvent = async (
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

    const interest = await tenantPrisma.eventInterest.deleteMany({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    await tenantPrisma.$disconnect();

    return interest;
  };
}
