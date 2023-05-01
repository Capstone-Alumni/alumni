import { Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export default class OwnerEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      AND: [{ userId: userId }, { archived: false }],
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
    { userId, eventId }: { userId: string; eventId: string },
  ) => {
    const event = await tenantPrisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        grade: true,
      },
    });

    // if (event?.userId !== userId) {
    //   throw new Error('denied');
    // }

    await tenantPrisma.$disconnect();

    return event;
  };

  static create = async (
    tenantPrisma: PrismaClient,
    userId: string,
    {
      title,
      description = '',
      backgroundImage = '',
      isOffline,
      location = '',
      startTime,
      endTime,
      gradeId,
      publicParticipant,
    }: {
      title: string;
      description?: string;
      backgroundImage?: string;
      isOffline?: boolean;
      location?: string;
      startTime: Date;
      endTime?: Date;
      gradeId?: string;
      publicParticipant?: boolean;
    },
  ) => {
    const payload: Prisma.EventCreateInput = {
      host: {
        connect: {
          id: userId,
        },
      },
      title,
      backgroundImage,
      description,
      isOffline,
      location,
      startTime,
      endTime,
      publicParticipant,
    };

    if (gradeId === 'all') {
      payload.isPublicSchool = true;
    } else {
      payload.grade = {
        connect: { id: gradeId },
      };
      payload.isPublicSchool = false;
    }

    const data = await tenantPrisma.event.create({
      data: payload,
    });

    await tenantPrisma.$disconnect();

    return data;
  };

  static updateById = async (
    tenantPrisma: PrismaClient,
    eventId: string,
    {
      title,
      backgroundImage,
      description,
      isOffline,
      location,
      startTime,
      endTime,
      gradeId,
      publicParticipant,
    }: {
      title: string;
      description?: string;
      backgroundImage?: string;
      isOffline?: boolean;
      location?: string;
      startTime: Date;
      isEnded: boolean;
      endTime?: Date;
      gradeId?: string;
      publicParticipant?: boolean;
    },
  ) => {
    const event = await tenantPrisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('403 denied');
    }

    const payload: Prisma.EventUpdateInput = {
      title,
      backgroundImage,
      description,
      isOffline,
      location,
      startTime,
      endTime,
      publicParticipant,
    };

    if (gradeId === 'all') {
      payload.isPublicSchool = true;
    } else {
      payload.isPublicSchool = false;
      payload.grade = {
        connect: { id: gradeId },
      };
      payload.isPublicSchool = false;
    }

    const newEvent = await tenantPrisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...payload,
      },
    });

    await tenantPrisma.$disconnect();

    return newEvent;
  };

  static deleteById = async (
    tenantPrisma: PrismaClient,
    userId: string,
    eventId: string,
  ) => {
    const event = await tenantPrisma.event.updateMany({
      where: {
        AND: [
          {
            id: eventId,
          },
        ],
      },
      data: {
        archived: true,
      },
    });

    await tenantPrisma.$disconnect();

    return event;
  };

  static getGoingList = async (
    tenantPrisma: PrismaClient,
    {
      userId,
      page,
      limit,
      title,
    }: { userId: string; page: number; limit: number; title: string },
  ) => {
    const whereFilter = {
      participantId: userId,
      event: {
        title: {
          contains: title,
        },
      },
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
          event: {
            include: {
              host: {
                include: {
                  information: true,
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
      items: items.map(item => item.event),
      itemPerPage: limit,
    };
  };

  static getInterestList = async (
    tenantPrisma: PrismaClient,
    {
      userId,
      page,
      limit,
      title,
    }: { userId: string; page: number; limit: number; title: string },
  ) => {
    const whereFilter = {
      interesterId: userId,
      archived: false,
      event: {
        title: {
          contains: title,
        },
      },
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.eventInterest.count({
        where: whereFilter,
      }),
      tenantPrisma.eventInterest.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          event: {
            include: {
              host: {
                include: {
                  information: true,
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
      items: items.map(item => item.event),
      itemPerPage: limit,
    };
  };
}
