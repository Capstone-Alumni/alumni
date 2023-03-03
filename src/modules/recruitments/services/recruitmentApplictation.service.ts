import { PrismaClient } from '@prisma/client';
import { UpdateApplication } from '../type';

export default class ApplicationService {
  static apply = async (
    tenantPrisma: PrismaClient,
    recruitmentId: string,
    userId: string,
    body: { resumeUrl: string },
  ) => {
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: {
        AND: [{ id: recruitmentId }, { archived: false }, { isApproved: true }],
      },
    });
    if (!recruitment) {
      throw new Error('Recruitment is not Existed');
    }
    const isExistedApplication =
      await tenantPrisma.recruitmentApplication.findFirst({
        where: {
          AND: [
            { applicationOwnerId: userId },
            { recruitmentId: recruitmentId },
          ],
        },
      });
    if (isExistedApplication) {
      throw new Error('Your application had been submitted');
    }

    const apply = await tenantPrisma.recruitmentApplication.create({
      data: {
        ...body,
        recruitment: {
          connect: {
            id: recruitmentId,
          },
        },
        applicationOwnerInfo: {
          connect: {
            userId: userId,
          },
        },
      },
    });

    return apply;
  };

  static update = async (
    tenantPrisma: PrismaClient,
    applicationId: string,
    userId: string,
    body: UpdateApplication,
  ) => {
    const isApplicationExisted =
      await tenantPrisma.recruitmentApplication.findFirst({
        where: { id: applicationId, archived: false },
      });
    if (!isApplicationExisted) {
      throw new Error('Application is not existed');
    } else if (isApplicationExisted.applicationOwnerId !== userId) {
      throw new Error('You are not allowed to update');
    }

    const updated = await tenantPrisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: {
        ...body,
      },
    });
    return updated;
  };

  static delete = async (
    tenantPrisma: PrismaClient,
    applicationId: string,
    userId: string,
    isSchoolAdmin: boolean,
  ) => {
    const application = await tenantPrisma.recruitmentApplication.findFirst({
      where: { id: applicationId, archived: false },
    });

    if (!application) {
      throw new Error('application is not existed');
    } else if (!isSchoolAdmin) {
      if (application && application.applicationOwnerId !== userId) {
        throw new Error('You are not allowed to delete this application');
      }
    }
    const deleted = await tenantPrisma.recruitmentApplication.update({
      where: { id: applicationId },
      data: {
        archived: true,
      },
    });
    return deleted;
  };

  static getAppliedList = async (
    tenantPrisma: PrismaClient,
    {
      recruitmentId,
      page,
      limit,
    }: { recruitmentId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      recruitmentId: recruitmentId,
      archived: false,
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.recruitmentApplication.count({
        where: whereFilter,
      }),
      tenantPrisma.recruitmentApplication.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          applicationOwnerInfo: {
            select: {
              fullName: true,
              email: true,
              phone: true,
            },
          },
        },
      }),
    ]);

    return {
      totalItems: totalItems,
      items,
      itemPerPage: limit,
    };
  };
}
