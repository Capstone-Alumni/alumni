import { VerifyAccountInfoServiceProps } from '../types';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export default class AccessRequestService {
  // bỏ, thay bằng sync information
  static verifyAccount = async (
    tenantPrisma: PrismaClient,
    data: VerifyAccountInfoServiceProps,
  ) => {
    await tenantPrisma.$disconnect();

    return null;
  };

  static getAccessRequestList = async (
    tenantPrisma: PrismaClient,
    {
      page,
      limit,
      alumniId,
    }: { page: number; limit: number; alumniId: string },
  ) => {
    const alumni = await tenantPrisma.alumni.findUnique({
      where: {
        id: alumniId,
      },
      include: {
        gradeMod: {
          select: {
            gradeId: true,
          },
        },
        alumniToClass: {
          where: {
            isClassMod: true,
          },
          select: {
            alumClassId: true,
          },
        },
      },
    });

    if (!alumni) {
      throw new Error('404 alumni');
    }

    const classIdList = alumni.alumniToClass.map(
      ({ alumClassId }) => alumClassId,
    );
    const gradeIdList = alumni.gradeMod.map(({ gradeId }) => gradeId);

    let whereFilter = {};
    if (!alumni.isOwner) {
      whereFilter = {
        OR: [
          { alumClassId: { in: classIdList } },
          { alumClass: { gradeId: { in: gradeIdList } } },
        ],
      };
    }

    const [totalAccessRequestList, accessRequestList] =
      await tenantPrisma.$transaction([
        tenantPrisma.accessRequest.count({
          where: whereFilter,
        }),
        tenantPrisma.accessRequest.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: whereFilter,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            alumClass: {
              include: {
                grade: true,
              },
            },
          },
        }),
      ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalAccessRequestList,
      items: accessRequestList,
      itemPerPage: limit,
    };
  };

  static getOwnedAccessStatus = async (
    tenantPrisma: PrismaClient,
    user: User,
  ) => {
    const alumni = await tenantPrisma.alumni.findFirst({
      where: {
        accountId: user.id,
      },
    });

    if (!alumni) {
      throw new Error('alumni not existed');
    }

    const accessRequest = await tenantPrisma.accessRequest.findFirst({
      where: {
        alumniId: user.id,
        archived: false,
      },
      include: {
        alumClass: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return {
      accessRequest: accessRequest,
    };
  };

  static rejectAccessRequest = async (
    tenantPrisma: PrismaClient,
    { id }: { id: string },
  ) => {
    const accessRequest = await tenantPrisma.accessRequest.update({
      where: {
        id: id,
      },
      data: {
        requestStatus: 2,
      },
    });

    await tenantPrisma.$disconnect();

    return accessRequest;
  };

  static approveAccessRequest = async (
    tenantPrisma: PrismaClient,
    { id }: { id: string },
  ) => {
    const accessRequest = await tenantPrisma.accessRequest.update({
      where: {
        id: id,
      },
      data: {
        requestStatus: 1,
      },
    });

    await tenantPrisma.$disconnect();

    return accessRequest;
  };

  static getAccessRequestByUserId = async (
    tenantPrisma: PrismaClient,
    { userId }: { userId: string },
  ) => {
    const accessRequest = await tenantPrisma.accessRequest.findFirst({
      where: {
        alumniId: userId,
        archived: false,
      },
      include: {
        alumClass: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return accessRequest;
  };
}
