import { AccessLevel } from '@prisma/client';
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
          hostInformation: {
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

  static getById = async (
    tenantPrisma: PrismaClient,
    { userId, eventId }: { userId: string; eventId: string },
  ) => {
    const event = await tenantPrisma.event.findUnique({
      where: {
        id: eventId,
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
      publicity,
      publicParticipant,
    }: {
      title: string;
      description?: string;
      backgroundImage?: string;
      isOffline?: boolean;
      location?: string;
      startTime: Date;
      endTime?: Date;
      publicity?: AccessLevel;
      publicParticipant?: boolean;
    },
  ) => {
    const data = await tenantPrisma.event.create({
      data: {
        userId: userId,
        title,
        backgroundImage,
        description,
        isOffline,
        location,
        startTime,
        endTime,
        publicity,
        publicParticipant,
      },
    });

    await tenantPrisma.$disconnect();

    return data;
  };

  static updateById = async (
    tenantPrisma: PrismaClient,
    userId: string,
    eventId: string,
    data: {
      title: string;
      backgroundImage?: string;
      description?: string;
      isOffline?: boolean;
      location?: string;
      startTime: Date;
      endTime?: Date;
      isEnded?: boolean;
      publicity?: AccessLevel;
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

    const newEvent = await tenantPrisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...data,
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
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      userId: userId,
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
              hostInformation: {
                include: {
                  alumClass: {
                    include: {
                      grade: true,
                    },
                  },
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
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      userId: userId,
      archived: false,
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
              hostInformation: {
                include: {
                  alumClass: {
                    include: {
                      grade: true,
                    },
                  },
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
