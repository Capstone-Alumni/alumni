import { PrismaClient } from '@prisma/client';

const fundfind = async (tenantPrima: PrismaClient, fundId: string) => {
  const fundfound = await tenantPrima.fund.findFirst({
    where: {
      AND: [{ id: fundId }, { archived: false }],
    },
  });
  if (!fundfound) {
    throw new Error('Fund is not existed');
  }
};
export default class ReportFundService {
  static create = async (
    tenantPrisma: PrismaClient,
    fundId: string,
    userId: string,
    body: { title: string; content: string },
  ) => {
    fundfind(tenantPrisma, fundId);
    const created = await tenantPrisma.fundReport.create({
      data: {
        ...body,
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
    return created;
  };

  static update = async (
    tenantPrisma: PrismaClient,
    reportId: string,
    userId: string,
    body: { title: string; content: string },
  ) => {
    const report = await tenantPrisma.fundReport.findFirst({
      where: { AND: [{ id: reportId }, { archived: false }] },
    });
    if (!report) {
      throw new Error('report is not existed');
    } else if (report.userId !== userId) {
      throw new Error('you are not allowed to edit this report');
    }
    const updated = await tenantPrisma.fundReport.update({
      where: {
        id: reportId,
      },
      data: {
        ...body,
      },
    });
    return updated;
  };

  static delete = async (
    tenantPrisma: PrismaClient,
    reportId: string,
    userId: string,
  ) => {
    const report = await tenantPrisma.fundReport.findFirst({
      where: { AND: [{ id: reportId }, { archived: false }] },
    });
    if (!report) {
      throw new Error('report is not existed');
    } else if (report.userId !== userId) {
      throw new Error('you are not allowed to edit this report');
    }
    const deleted = await tenantPrisma.fundReport.update({
      where: { id: reportId },
      data: { archived: true },
    });
    return deleted;
  };

  static getById = async (tenantPrisma: PrismaClient, reportId: string) => {
    const report = await tenantPrisma.fundReport.findFirst({
      where: { AND: [{ id: reportId }, { archived: false }] },
    });
    if (!report) {
      throw new Error('report is not existed');
    }
    return report;
  };

  static getList = async (tenantPrisma: PrismaClient, fundId: string) => {
    fundfind(tenantPrisma, fundId);
    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.fundReport.count({
        where: { archived: false },
      }),
      tenantPrisma.fundReport.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          userInformation: true,
        },
      }),
    ]);
    return {
      totalItems: totalItems,
      items,
    };
  };
}
