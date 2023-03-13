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
    const recruitmentOwnerInfo = await tenantPrisma.information.findFirst({
      where: { userId: recruitmentOwnerId },
    });
    const newRecruitment = recruitmentOwnerInfo
      ? await tenantPrisma.recruitment.create({
          data: {
            ...body,
            recruitmentOwnerId: recruitmentOwnerId,
            recruitmentOwnerInfo: {
              connect: { id: recruitmentOwnerInfo?.id },
            },
          },
        })
      : await tenantPrisma.recruitment.create({
          data: {
            ...body,
            recruitmentOwnerId: recruitmentOwnerId,
          },
        });
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
    return deletedRecruitment;
  };

  static getAprovedList = async (
    tenantPrisma: PrismaClient,
    params: GetListRecruitmentParams,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);

    const { companyName, job, position, salary, type } = params;
    const whereFilter = {
      AND: [
        { companyName: { contains: companyName } },
        { job: { contains: job } },
        { position: { contains: position } },
        { salary: { contains: salary } },
        { type: { contains: type } },
        { archived: false },
        { isApproved: true },
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
        orderBy: [{ createdAt: 'desc' }],
      }),
    ]);
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
      where: { id: recruitmentId, isApproved: true, archived: false },
    });
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
    return recruitment;
  };
}
