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

    if (event?.userId !== userId) {
      throw new Error('denied');
    }

    await tenantPrisma.$disconnect();

    return event;
  };

  static create = async (
    tenantPrisma: PrismaClient,
    userId: string,
    {
      title,
      description = '',
      isOffline,
      location = '',
      registrationTime,
      startTime,
      endTime,
      publicity,
      publicParticipant,
    }: {
      title: string;
      description?: string;
      isOffline?: boolean;
      location?: string;
      registrationTime?: Date;
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
        description,
        isOffline,
        location,
        registrationTime,
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
      description?: string;
      isOffline?: boolean;
      location?: string;
      registrationTime?: Date;
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

    if (!event || event.userId !== userId) {
      throw new Error('403 denied');
    }

    const newEvent = await tenantPrisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...data,
        approvedStatus: -1,
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
          {
            userId: userId,
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
}
