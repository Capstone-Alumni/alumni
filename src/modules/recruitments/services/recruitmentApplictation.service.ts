import { PrismaClient } from '@prisma/client';

export default class ApplicationService {
  static apply = async (
    tenantPrisma: PrismaClient,
    { recruitmentId, userId }: { recruitmentId: string; userId: string },
  ) => {
    const recruitment = await tenantPrisma.recruitment.findFirst({
      where: {
        AND: [{ id: recruitmentId }, { archived: false }, { isApproved: true }],
      },
    });
    if (!recruitment) {
      throw new Error('Recruitment is not Existed');
    }
    const applicationOwner =
      await tenantPrisma.recruitmentApplication.findFirst({
        where: { applicationOwnerId: userId, recruitmentId: recruitmentId },
      });
    if (applicationOwner) {
      return applicationOwner;
    }

    const apply = await tenantPrisma.recruitmentApplication.create({
      data: {
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
    body: { resumeUrl: string },
  ) => {
    const isApplicationExisted =
      await tenantPrisma.recruitmentApplication.findFirst({
        where: { id: applicationId, archived: false },
      });
    if (!isApplicationExisted) {
      throw new Error('Application is not existed');
    } else if (isApplicationExisted.applicationOwnerId !== userId) {
      throw new Error('Not allowed to edit this application');
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
        throw new Error('Not allowed to delete this comment');
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
          applicationOwnerInfo: true,
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
