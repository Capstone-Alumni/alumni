import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

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
    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.fund.count({
        where: {
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
          archived: false,
          title: {
            contains: title,
          },
        },
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
    { user, fundId }: { user: User; fundId: string },
  ) => {
    const Fund = await tenantPrisma.fund.findFirst({
      where: {
        id: fundId,
        archived: false,
      },
    });

    return Fund;
  };

  // Bỏ
  static approve = async (
    tenantPrisma: PrismaClient,
    { user, fundId }: { user: User; fundId: string },
  ) => {
    await tenantPrisma.fund.updateMany({
      where: {
        id: fundId,
        archived: false,
      },
      data: {
        // approvedStatus: 1,
      },
    });

    return null;
  };

  // Bỏ
  static reject = async (
    tenantPrisma: PrismaClient,
    { user, fundId }: { user: User; fundId: string },
  ) => {
    await tenantPrisma.fund.updateMany({
      where: {
        id: fundId,
      },
      data: {
        // approvedStatus: 0,
      },
    });

    return null;
  };
}
