import { AccessLevel } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export default class OwnerFundService {
  static getList = async (
    tenantPrisma: PrismaClient,
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      AND: [{ userId: userId }, { archived: false }],
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
    { userId, fundId }: { userId: string; fundId: string },
  ) => {
    const fund = await tenantPrisma.fund.findUnique({
      where: {
        id: fundId,
      },
    });

    if (fund?.userId !== userId) {
      throw new Error('denied');
    }

    await tenantPrisma.$disconnect();

    return fund;
  };

  static create = async (
    tenantPrisma: PrismaClient,
    userId: string,
    {
      title,
      description = '',
      isOffline,
      location = '',
      startTime,
      endTime,
      isEnded,
      targetBalance,
      currentBalance,
      publicity,
      publicParticipant,
    }: {
      title: string;
      description?: string;
      isOffline?: boolean;
      location?: string;
      startTime: Date;
      endTime?: Date;
      isEnded?: boolean;
      targetBalance: number;
      currentBalance: number;
      publicity?: AccessLevel;
      publicParticipant?: boolean;
    },
  ) => {
    const data = await tenantPrisma.fund.create({
      data: {
        userId: userId,
        title,
        description,
        isOffline,
        location,
        startTime,
        endTime,
        isEnded,
        targetBalance,
        currentBalance,
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
    fundId: string,
    data: {
      title: string;
      description?: string;
      isOffline?: boolean;
      location?: string;
      startTime: Date;
      endTime?: Date;
      isEnded?: boolean;
      targetBalance: number;
      currentBalance: number;
      publicity?: AccessLevel;
      publicParticipant?: boolean;
    },
  ) => {
    const fund = await tenantPrisma.fund.findUnique({
      where: {
        id: fundId,
      },
    });

    if (!fund || fund.userId !== userId) {
      throw new Error('403 denied');
    }

    const updateData: any = {
      ...data,
      approvedStatus: -1,
    };

    if (data.currentBalance !== fund.currentBalance) {
      updateData.balanceUpdatedAt = new Date();
    }

    const newFund = await tenantPrisma.fund.update({
      where: {
        id: fundId,
      },
      data: updateData,
    });

    await tenantPrisma.$disconnect();

    return newFund;
  };

  static deleteById = async (
    tenantPrisma: PrismaClient,
    userId: string,
    fundId: string,
  ) => {
    const fund = await tenantPrisma.fund.updateMany({
      where: {
        AND: [
          {
            id: fundId,
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

    return fund;
  };

  static getSavedList = async (
    tenantPrisma: PrismaClient,
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      userId: userId,
      archived: false,
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.fundSaved.count({
        where: whereFilter,
      }),
      tenantPrisma.fundSaved.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          fund: true,
        },
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalItems,
      items: items.map(item => item.fund),
      itemPerPage: limit,
    };
  };
}
