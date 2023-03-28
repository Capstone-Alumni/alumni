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

const buildFundWhereFilter = async (tenantPrisma: PrismaClient, user: User) => {
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

export default class AdminFundService {
  static getList = async (
    tenantPrisma: PrismaClient,
    {
      user,
      page,
      limit,
      title,
    }: {
      user: User;
      page: number;
      limit: number;
      title: string;
    },
  ) => {
    const whereFilter = await buildFundWhereFilter(tenantPrisma, user);

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.fund.count({
        where: {
          ...whereFilter,
          archived: false,
          title: {
            contains: title,
          },
        },
      }),
      tenantPrisma.fund.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ...whereFilter,
          archived: false,
          title: {
            contains: title,
          },
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
    { user, fundId }: { user: User; fundId: string },
  ) => {
    const whereFilter = await buildFundWhereFilter(tenantPrisma, user);

    const Fund = await tenantPrisma.fund.findFirst({
      where: {
        ...whereFilter,
        id: fundId,
      },
    });

    return Fund;
  };

  static approve = async (
    tenantPrisma: PrismaClient,
    { user, fundId }: { user: User; fundId: string },
  ) => {
    const whereFilter = await buildFundWhereFilter(tenantPrisma, user);

    await tenantPrisma.fund.updateMany({
      where: {
        ...whereFilter,
        id: fundId,
      },
      data: {
        // approvedStatus: 1,
      },
    });

    return null;
  };

  static reject = async (
    tenantPrisma: PrismaClient,
    { user, fundId }: { user: User; fundId: string },
  ) => {
    const whereFilter = await buildFundWhereFilter(tenantPrisma, user);

    await tenantPrisma.fund.updateMany({
      where: {
        ...whereFilter,
        id: fundId,
      },
      data: {
        // approvedStatus: 0,
      },
    });

    return null;
  };
}
