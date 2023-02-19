import { PrismaClient } from '@prisma/client';
import { getPageAndLimitFromParams } from 'src/utils';
import { GetListRecruitmentParams } from '../type';

const isRecruitmentExisted = async (
  tenantPrisma: PrismaClient,
  recruitmentId: string,
) => {
  const recruitment = await tenantPrisma.recruitment.findFirst({
    where: {
      AND: [{ id: recruitmentId }, { archived: false }],
    },
  });
  if (!recruitment) {
    throw new Error('Recruitment is not Existed');
  }
};

export default class AdminRecruitmentService {
  static getById = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
  ) => {
    await isRecruitmentExisted(tenantPrisma, recruitmentId);
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: { id: recruitmentId },
    });
    return recruitment;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    params: GetListRecruitmentParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const { companyName } = params;
    const whereFilter = { companyName: { contains: companyName } };

    const [totalItem, recruitmentItem] = await tenantPrisma.$transaction([
      tenantPrisma.recruitment.count({
        where: whereFilter,
      }),
      tenantPrisma.recruitment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: [{ createdAt: 'desc' }],
      }),
    ]);
    return {
      totalItems: totalItem,
      items: recruitmentItem,
      itemPerPage: limit,
    };
  };

  static approve = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
  ) => {
    const recruitment = await tenantPrisma.recruitment.update({
      where: { id: recruitmentId },
      data: {
        isApproved: true,
      },
    });
    return recruitment;
  };

  static reject = async (tenantPrisma: PrismaClient, recruitmentId: string) => {
    const recruitment = await tenantPrisma.recruitment.update({
      where: { id: recruitmentId },
      data: {
        isApproved: false,
      },
    });
    return recruitment;
  };
}