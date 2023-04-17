import { Prisma, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export const buildEventWhereFilter = async (
  tenantPrisma: PrismaClient,
  user: User,
) => {
  const alumni = await tenantPrisma.alumni.findUnique({
    where: {
      id: user.id,
    },
    include: {
      alumniToClass: {
        include: {
          alumClass: true,
        },
      },
    },
  });

  if (!alumni) {
    throw new Error('user not exist');
  }

  const whereFilter: Prisma.EventWhereInput = {
    OR: [
      {
        isPublicSchool: true,
      },
      {
        gradeId: {
          in: alumni.alumniToClass.map(cl => cl.alumClass.gradeId),
        },
      },
    ],
  };

  return whereFilter;
};

export default class PublicEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    user: User,
    {
      page,
      limit,
      userId,
      title,
    }: { page: number; limit: number; userId?: string; title: string },
  ) => {
    const scopeFilter = await buildEventWhereFilter(tenantPrisma, user);

    const whereFilter: Prisma.EventWhereInput = {
      ...scopeFilter,
      archived: false,
      title: {
        contains: title,
      },
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
          startTime: 'desc',
        },
        include: {
          eventParticipants: {
            where: {
              participantId: userId,
            },
          },
          eventInterests: {
            where: {
              interesterId: userId,
            },
          },
          host: {
            include: {
              information: true,
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

  static getById = async (
    tenantPrisma: PrismaClient,
    { eventId, userId }: { eventId: string; userId: string },
  ) => {
    const event = await tenantPrisma.event.findFirst({
      where: {
        id: eventId,
      },
      include: {
        eventParticipants: {
          where: {
            participantId: userId ?? '',
          },
        },
        eventInterests: {
          where: {
            interesterId: userId ?? '',
          },
        },
        host: {
          include: {
            information: true,
          },
        },
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

    if (!event) {
      throw new Error('404 not found event');
    }

    const existedParticipant = await tenantPrisma.eventParticipant.findFirst({
      where: {
        participantId: userId,
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
        participant: {
          connect: {
            id: userId,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return participant;
  };

  static unjoinEvent = async (
    tenantPrisma: PrismaClient,
    { eventId, userId }: { eventId: string; userId: string },
  ) => {
    const event = await tenantPrisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('404 not found event');
    }

    const deletedCount = await tenantPrisma.eventParticipant.deleteMany({
      where: {
        participantId: userId,
        eventId: eventId,
      },
    });

    await tenantPrisma.$disconnect();

    return deletedCount;
  };

  static getParticipantList = async (
    tenantPrisma: PrismaClient,
    { eventId, page, limit }: { eventId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      eventId: eventId,
      // publicity: 'SCHOOL_ADMIN',
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
          participant: {
            include: {
              information: true,
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

    if (!event) {
      throw new Error('404 not found event');
    }

    const existedInterest = await tenantPrisma.eventInterest.findFirst({
      where: {
        interesterId: userId,
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
        interester: {
          connect: {
            id: userId,
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

    if (!event) {
      throw new Error('404 not found event');
    }

    const interest = await tenantPrisma.eventInterest.deleteMany({
      where: {
        interesterId: userId,
        eventId: eventId,
      },
    });

    await tenantPrisma.$disconnect();

    return interest;
  };
}
