import { buildAccessLevelFilter } from './../../share/helpers/prismaWhereFilterBuilder';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export default class AdminEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    {
      user,
      page,
      limit,
      archived,
      approved,
    }: {
      user: User;
      page: number;
      limit: number;
      archived: boolean;
      approved: boolean;
    },
  ) => {
    const publicityFilter = buildAccessLevelFilter(
      'publicity',
      user.accessLevel,
    );
    const whereFilter = {
      ...publicityFilter,
      archived: archived,
      approvedStatus: approved ? 1 : -1,
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
    { user, eventId }: { user: User; eventId: string },
  ) => {
    const publicityFilter = buildAccessLevelFilter(
      'publicity',
      user.accessLevel,
    );
    const event = await tenantPrisma.event.findUnique({
      where: {
        ...publicityFilter,
        id: eventId,
      },
    });

    return event;
  };

  static approve = async (
    tenantPrisma: PrismaClient,
    { user, eventId }: { user: User; eventId: string },
  ) => {
    const publicityFilter = buildAccessLevelFilter(
      'publicity',
      user.accessLevel,
    );

    const event = await tenantPrisma.event.update({
      where: {
        ...publicityFilter,
        id: eventId,
      },
      data: {
        approvedStatus: 1,
      },
    });

    return event;
  };

  static reject = async (
    tenantPrisma: PrismaClient,
    { user, eventId }: { user: User; eventId: string },
  ) => {
    const publicityFilter = buildAccessLevelFilter(
      'publicity',
      user.accessLevel,
    );

    const event = await tenantPrisma.event.update({
      where: {
        ...publicityFilter,
        id: eventId,
      },
      data: {
        approvedStatus: 0,
      },
    });

    return event;
  };
}
