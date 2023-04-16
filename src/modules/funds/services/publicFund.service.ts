import { Prisma, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export default class PublicFundService {
  static getList = async (
    tenantPrisma: PrismaClient,
    {
      page,
      limit,
      title,
      status,
      userId,
    }: {
      page: number;
      limit: number;
      title: string;
      status: 'ended' | 'going';
      userId?: string;
    },
  ) => {
    const whereFilter: Prisma.FundWhereInput = {
      archived: false,
      title: {
        contains: title,
      },
      startTime: {
        lt: new Date(),
      },
    };

    if (status === 'going') {
      whereFilter.endTime = {
        gt: new Date(),
      };
    } else {
      whereFilter.endTime = {
        lte: new Date(),
      };
    }

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
              saverId: userId ?? '',
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

    // const transformedItems = items.map(item =>
    //   omit('fundTransactions')({
    //     ...item,
    //     currentBalance: item.fundTransactions.reduce(
    //       (sum, tsx) => tsx.vnp_Amount + sum,
    //       0,
    //     ),
    //   }),
    // );

    return {
      totalItems: totalItems,
      items: items,
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
      },
      include: {
        fundSaved: {
          where: {
            saverId: userId ?? '',
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

    if (!fund) {
      throw new Error('404 not found Fund');
    }

    const existedSave = await tenantPrisma.fundSaved.findFirst({
      where: {
        saverId: userId,
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
        saver: {
          connect: { id: userId },
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

    if (!fund) {
      throw new Error('404 not found Fund');
    }

    const save = await tenantPrisma.fundSaved.deleteMany({
      where: {
        saverId: userId,
        fundId: fundId,
      },
    });

    await tenantPrisma.$disconnect();

    return save;
  };

  static getTransactionList = async (
    tenantPrisma: PrismaClient,
    user: User,
    { page, limit, fundId }: { page: number; limit: number; fundId?: string },
  ) => {
    const fund = await tenantPrisma.fund.findUnique({
      where: { id: fundId },
    });

    if (!fund) {
      return [];
    }

    const whereFilter = {
      fundId: fundId,
      paymentStatus: 1,
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
          alumni: {
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
      items: items.map(item => ({
        ...item,
        alumni: item.incognito && user.id !== fund.hostId ? null : item.alumni,
      })),
      itemPerPage: limit,
    };
  };
}
