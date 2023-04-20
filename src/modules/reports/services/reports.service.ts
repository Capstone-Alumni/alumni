import { PrismaClient } from '@prisma/client';
import {
  CreateReportProps,
  GetListReportParams,
  UpdateReportProps,
} from '../types';
import { getPageAndLimitFromParams } from '../../../utils';

const isReportExisted = async (
  tenantPrisma: PrismaClient,
  reportId: string,
) => {
  const report = await tenantPrisma.reports.findFirst({
    where: {
      AND: [{ id: reportId }, { archived: false }],
    },
  });
  if (!report) {
    throw new Error('Reports is not Existed');
  }
};

export default class ReportsService {
  static create = async (
    tenantPrisma: PrismaClient,
    body: CreateReportProps,
  ) => {
    const newReport = await tenantPrisma.reports.create({
      data: {
        ...body,
      },
    });
    return newReport;
  };

  static update = async (
    tenantPrisma: PrismaClient,
    reportId: string,
    body: UpdateReportProps,
  ) => {
    const updatedReport = await tenantPrisma.reports.update({
      where: { id: reportId },
      data: body,
    });
    return updatedReport;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    params: GetListReportParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const whereFilter = {
      AND: [{ archived: false }],
    };

    const [totalItem, reportItem] = await tenantPrisma.$transaction([
      tenantPrisma.reports.count({
        where: whereFilter,
      }),
      tenantPrisma.reports.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: [{ createdAt: 'desc' }],
      }),
    ]);
    return {
      totalItems: totalItem,
      items: reportItem,
      itemPerPage: limit,
    };
  };

  static delete = async (tenantPrisma: PrismaClient, reportId: string) => {
    await isReportExisted(tenantPrisma, reportId);
    const reportUpdated = await tenantPrisma.reports.update({
      where: { id: reportId },
      data: {
        archived: true,
      },
    });

    return reportUpdated;
  };
}
