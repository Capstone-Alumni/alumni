import { VerifyAccountInfoServiceProps } from '../types';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export default class AccessRequestService {
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
        userId: userId,
        fullName: data.fullName,
        email: data.email,
        alumClass: {
          connect: {
            id: data.classId,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return accessRequest;
  };

  static getAccessRequestList = async (
    tenantPrisma: PrismaClient,
    { userId, page, limit }: { userId: string; page: number; limit: number },
  ) => {
    const user = await tenantPrisma.information.findUnique({
      where: {
        userId: userId,
      },
      include: {
        alumClass: true,
      },
    });

    if (!user || !user.alumClass) {
      throw new Error('404 user');
    }

    const classId = user.alumClass.id;

    const whereFilter = {
      AND: [
        { alumClassId: classId },
        { isApproved: false },
        { archived: false },
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
            alumClass: true,
            grade: true,
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

    console.log(accessRequest);

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
        isApproved: false,
        archived: true,
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
        isApproved: true,
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
