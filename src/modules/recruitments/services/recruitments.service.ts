import { PrismaClient } from '@prisma/client';
import {
  CreateRecruitmentProps,
  GetListRecruitmentParams,
  UpdateRecruitmentProps,
} from '../types';
import { getPageAndLimitFromParams } from '../../../utils';

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

export default class RecruimentService {
  static create = async (
    tenantPrisma: PrismaClient,
    recruitmentOwnerId: string,
    body: CreateRecruitmentProps,
  ) => {
    const recruitmentOwnerAlumni = await tenantPrisma.alumni.findFirst({
      where: { id: recruitmentOwnerId },
    });
    const newRecruitment = await tenantPrisma.recruitment.create({
      data: {
        ...body,
        isPublic: true,
        recruitmentOwner: {
          connect: { id: recruitmentOwnerAlumni?.id },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return newRecruitment;
  };

  static update = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
    body: UpdateRecruitmentProps,
  ) => {
    await isRecruitmentExisted(tenantPrisma, recruitmentId);
    const updatedRecruitment = await tenantPrisma.recruitment.update({
      where: { id: recruitmentId },
      data: body,
    });

    await tenantPrisma.$disconnect();

    return updatedRecruitment;
  };

  static delete = async (tenantPrisma: PrismaClient, recruitmentId: string) => {
    await isRecruitmentExisted(tenantPrisma, recruitmentId);
    const deletedRecruitment = await tenantPrisma.recruitment.update({
      where: { id: recruitmentId },
      data: {
        archived: true,
      },
    });

    await tenantPrisma.$disconnect();

    return deletedRecruitment;
  };

  static getAprovedList = async (
    tenantPrisma: PrismaClient,
    params: GetListRecruitmentParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);
    const { companyName, job, position, salary, type, title } = params;

    const whereFilter = {
      AND: [
        { title: { contains: title } },
        { companyName: { contains: companyName } },
        { job: { contains: job } },
        { position: { contains: position } },
        { salary: { contains: salary } },
        { type: { contains: type } },
        { archived: false },
        { isPublic: true },
      ],
    };

    const [totalItem, recruitmentItem] = await tenantPrisma.$transaction([
      tenantPrisma.recruitment.count({
        where: whereFilter,
      }),
      tenantPrisma.recruitment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          recruitmentOwner: {
            include: {
              information: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }],
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalItem,
      items: recruitmentItem,
      itemPerPage: limit,
    };
  };

  static getApprovedDetailRecruitment = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
  ) => {
    await isRecruitmentExisted(tenantPrisma, recruitmentId);
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: { id: recruitmentId, isPublic: true, archived: false },
    });

    await tenantPrisma.$disconnect();

    return recruitment;
  };

  static getListByOwnerId = async (
    tenantPrisma: PrismaClient,
    {
      recruitmentOwnerId,
      page,
      limit,
    }: { recruitmentOwnerId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      AND: [{ archived: false }, { recruitmentOwnerId: recruitmentOwnerId }],
    };

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

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalItem,
      items: recruitmentItem,
      itemPerPage: limit,
    };
  };

  static getUserAppliedJobList = async (
    tenantPrisma: PrismaClient,
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      AND: [{ archived: false }, { applicationOwnerId: userId }],
    };

    const [totalItem, recruitmentItem] = await tenantPrisma.$transaction([
      tenantPrisma.recruitmentApplication.count({
        where: whereFilter,
      }),
      tenantPrisma.recruitmentApplication.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: [{ createdAt: 'desc' }],
        include: {
          recruitment: {
            select: {
              address: true,
              archived: true,
              job: true,
              companyImageUrl: true,
              companyName: true,
              id: true,
              title: true,
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

  static getById = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
  ) => {
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: { id: recruitmentId, archived: false },
    });

    await tenantPrisma.$disconnect();

    return recruitment;
  };
}
