import { PrismaClient } from '@prisma/client';
import { getPageAndLimitFromParams } from 'src/utils';
import { GetListRecruitmentParams } from '../types';

export default class AdminRecruitmentService {
  static getById = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
  ) => {
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: { id: recruitmentId },
    });

    await tenantPrisma.$disconnect();

    return recruitment;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    params: GetListRecruitmentParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const { companyName, job, position, salary, type, title } = params;
    const whereFilter = {
      AND: [
        { companyName: { contains: companyName } },
        { job: { contains: job } },
        { position: { contains: position } },
        { salary: { contains: salary } },
        { type: { contains: type } },
        { title: { contains: title } },
      ],
    };

    console.log('title', title);

    const [totalItem, recruitmentItem] = await tenantPrisma.$transaction([
      tenantPrisma.recruitment.count({
        where: whereFilter,
      }),
      tenantPrisma.recruitment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: [{ createdAt: 'desc' }],
        include: {
          recruitmentOwner: {
            include: {
              information: true,
            },
          },
        },
      }),
    ]);

    await tenantPrisma.$disconnect();

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
        isPublic: true,
      },
    });

    await tenantPrisma.$disconnect();

    return recruitment;
  };

  static reject = async (tenantPrisma: PrismaClient, recruitmentId: string) => {
    const recruitment = await tenantPrisma.recruitment.update({
      where: { id: recruitmentId },
      data: {
        isPublic: false,
      },
    });

    await tenantPrisma.$disconnect();

    return recruitment;
  };
}
