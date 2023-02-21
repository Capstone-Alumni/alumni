import { buildAccessLevelFilter } from './../../share/helpers/prismaWhereFilterBuilder';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

const getSameClassFilter = (classId: string) => ({
  hostInformation: {
    alumClassId: classId,
  },
});

const getSameGradeFilter = (gradeId: string) => ({
  hostInformation: {
    alumClass: {
      gradeId: gradeId,
    },
  },
});

const buildEventWhereFilter = async (
  tenantPrisma: PrismaClient,
  user: User,
) => {
  const userInformation = await tenantPrisma.information.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      alumClass: true,
    },
  });

  if (!userInformation) {
    throw new Error('user not exist');
  }

  const publicityFilter = buildAccessLevelFilter('publicity', user.accessLevel);
  let gradeClassFilter = {};
  if (user.accessLevel === 'CLASS_MOD') {
    gradeClassFilter = getSameClassFilter(userInformation.alumClassId || '');
  }
  if (user.accessLevel === 'GRADE_MOD') {
    gradeClassFilter = getSameGradeFilter(
      userInformation.alumClass?.gradeId || '',
    );
  }

  const whereFilter = {
    ...publicityFilter,
    ...gradeClassFilter,
  };

  return whereFilter;
};

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
    const whereFilter = await buildEventWhereFilter(tenantPrisma, user);

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.event.count({
        where: {
          ...whereFilter,

          approvedStatus: approved ? approved : undefined,
        },
      }),
      tenantPrisma.event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ...whereFilter,

          approvedStatus: approved ? approved : undefined,
        },
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
    const whereFilter = await buildEventWhereFilter(tenantPrisma, user);

    const event = await tenantPrisma.event.findUnique({
      where: {
        ...whereFilter,
        id: eventId,
      },
    });

    return event;
  };

  static approve = async (
    tenantPrisma: PrismaClient,
    { user, eventId }: { user: User; eventId: string },
  ) => {
    const whereFilter = await buildEventWhereFilter(tenantPrisma, user);

    await tenantPrisma.event.updateMany({
      where: {
        ...whereFilter,
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
    const whereFilter = await buildEventWhereFilter(tenantPrisma, user);

    await tenantPrisma.event.updateMany({
      where: {
        ...whereFilter,
        id: eventId,
      },
      data: {
        approvedStatus: 0,
      },
    });

    return null;
  };
}
