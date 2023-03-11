import { PrismaClient } from '@prisma/client';

export default class PublicFundService {
  static getList = async (
    tenantPrisma: PrismaClient,
    { page, limit, userId }: { page: number; limit: number; userId?: string },
  ) => {
    const whereFilter = {
      AND: [{ approvedStatus: 1 }, { archived: false }],
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.fund.count({
        where: whereFilter,
      }),
      tenantPrisma.fund.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          fundSaved: {
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
    { fundId, userId }: { fundId: string; userId: string },
  ) => {
    const fund = await tenantPrisma.fund.findFirst({
      where: {
        id: fundId,
        approvedStatus: 1,
      },
      include: {
        fundSaved: {
          where: {
            userId: userId ?? '',
          },
        },
        hostInformation: true,
      },
    });

    await tenantPrisma.$disconnect();

    return fund;
  };

  static saveFund = async (
    tenantPrisma: PrismaClient,
    { fundId, userId }: { fundId: string; userId: string },
  ) => {
    const fund = await tenantPrisma.fund.findUnique({
      where: {
        id: fundId,
      },
    });

    if (!fund || fund?.approvedStatus !== 1) {
      throw new Error('404 not found Fund');
    }

    const existedSave = await tenantPrisma.fundSaved.findFirst({
      where: {
        userId: userId,
        fundId: fundId,
      },
    });

    if (existedSave) {
      return existedSave;
    }

    const participant = await tenantPrisma.fundSaved.create({
      data: {
        fund: {
          connect: {
            id: fundId,
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

  static unsaveFund = async (
    tenantPrisma: PrismaClient,
    { fundId, userId }: { fundId: string; userId: string },
  ) => {
    const fund = await tenantPrisma.fund.findUnique({
      where: {
        id: fundId,
      },
    });

    if (!fund || fund?.approvedStatus !== 1) {
      throw new Error('404 not found Fund');
    }

    const save = await tenantPrisma.fundSaved.deleteMany({
      where: {
        userId: userId,
        fundId: fundId,
      },
    });

    await tenantPrisma.$disconnect();

    return save;
  };

  static getTransactionList = async (
    tenantPrisma: PrismaClient,
    { page, limit, fundId }: { page: number; limit: number; fundId?: string },
  ) => {
    const whereFilter = {
      fundId: fundId,
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.fundTransaction.count({
        where: whereFilter,
      }),
      tenantPrisma.fundTransaction.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          userInformation: {
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
}
