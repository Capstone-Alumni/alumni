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
      approved,
    }: {
      user: User;
      page: number;
      limit: number;
      approved: number | undefined;
    },
  ) => {
    const publicityFilter = buildAccessLevelFilter(
      'publicity',
      user.accessLevel,
    );
    const whereFilter = {
      ...publicityFilter,
      approvedStatus: approved ? approved : undefined,
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

    await tenantPrisma.event.updateMany({
      where: {
        ...publicityFilter,
        id: eventId,
      },
      data: {
        approvedStatus: 1,
      },
    });

    return null;
  };

  static reject = async (
    tenantPrisma: PrismaClient,
    { user, eventId }: { user: User; eventId: string },
  ) => {
    const publicityFilter = buildAccessLevelFilter(
      'publicity',
      user.accessLevel,
    );

    await tenantPrisma.event.updateMany({
      where: {
        ...publicityFilter,
        id: eventId,
      },
      data: {
        approvedStatus: 0,
      },
    });

    return null;
  };
}
