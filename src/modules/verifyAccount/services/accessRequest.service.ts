import { VerifyAccountInfoServiceProps } from '../types';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export default class AccessRequestService {
  // bỏ, thay bằng sync information
  static verifyAccount = async (
    tenantPrisma: PrismaClient,
    data: VerifyAccountInfoServiceProps,
  ) => {
    const { userId, accessLevel } = data;

    const accessRequestListData = await tenantPrisma.accessRequest.findMany({
      where: {
        userId: userId,
        isApproved: false,
        archived: false,
      },
    });

    if (accessRequestListData.length > 0) {
      throw new Error('400 existed access-request');
    }

    const accessRequest = await tenantPrisma.accessRequest.create({
      data: {
        userId: userId,
        email: data.email,
        fullName: data.fullName,
        grade: {
          connect: {
            id: data.gradeId,
          },
        },
        alumClass: {
          connect: {
            id: data.classId,
          },
        },
        isApproved: accessLevel !== 'ALUMNI',
      },
    });

    await tenantPrisma.information.upsert({
      where: {
        userId: userId,
      },
      update: {
        fullName: data.fullName,
        alumClass: {
          connect: {
            id: data.classId,
          },
        },
      },
      create: {
        fullName: data.fullName,
        email: data.email,
        alumClass: {
          connect: {
            id: data.classId,
          },
        },
        alumni: {
          connect: {
            accountId: userId,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return accessRequest;
  };

  static getAccessRequestList = async (
    tenantPrisma: PrismaClient,
    {
      accountId,
      page,
      limit,
    }: { accountId: string; page: number; limit: number },
  ) => {
    const alumni = await tenantPrisma.alumni.findUnique({
      where: {
        accountId: accountId,
      },
      include: {
        GradeMod: true,
        alumniToClass: {
          where: {
            isClassMod: true,
          },
        },
      },
    });

    if (!alumni) {
      throw new Error('404 alumni');
    }

    const classIdList = alumni.alumniToClass.map(cl => cl.alumClassId);
    const gradeIdList = alumni.gradeMod.map(gr => gr.gradeId);

    const whereFilter = {
      OR: [
        { alumClassId: { in: classIdList } },
        { alumClass: { gradeId: { in: gradeIdList } } },
      ],
    };

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
        userId: user.id,
        archived: false,
      },
      include: {
        alumClass: {
          select: {
            id: true,
            name: true,
          },
        },
        grade: {
          select: {
            id: true,
            code: true,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return {
      accessStatus: alumni.accessStatus,
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
        userId: userId,
        archived: false,
      },
      include: {
        alumClass: {
          select: {
            id: true,
            name: true,
          },
        },
        grade: {
          select: {
            id: true,
            code: true,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return accessRequest;
  };
}
