import { VerifyAccountInfoServiceProps } from '../types';
import { Prisma, PrismaClient } from '@prisma/client';
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
      status,
      name,
    }: {
      page: number;
      limit: number;
      alumniId: string;
      status?: number;
      name?: string;
    },
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

    let whereFilter: Prisma.AccessRequestWhereInput = {
      OR: [
        {
          fullName: { contains: name, mode: 'insensitive' },
        },
        {
          email: { contains: name, mode: 'insensitive' },
        },
      ],
    };
    if (!alumni.isOwner) {
      whereFilter = {
        OR: [
          { alumClassId: { in: classIdList } },
          { alumClass: { gradeId: { in: gradeIdList } } },
        ],
      };
    }
    if (status !== undefined) {
      whereFilter.requestStatus = status;
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
        id: user.id,
      },
    });

    if (!alumni) {
      throw new Error('alumni not exist');
    }

    const accessRequest = await tenantPrisma.accessRequest.findMany({
      where: {
        alumniId: user.id,
        requestStatus: {
          not: 1,
        },
      },
      include: {
        alumClass: {
          include: {
            grade: true,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return {
      items: accessRequest,
    };
  };

  static requestJoinClass = async (
    tenantPrisma: PrismaClient,
    {
      alumniId,
      alumClassId,
    }: {
      alumniId: string;
      alumClassId: string;
    },
  ) => {
    const alumni = await tenantPrisma.alumni.findUnique({
      where: {
        id: alumniId,
      },
      include: {
        information: {
          select: {
            fullName: true,
            email: true,
          },
        },
        alumniToClass: {
          select: {
            alumClassId: true,
          },
        },
      },
    });

    if (!alumni) {
      throw new Error('non-exist alumni');
    }

    const existingRequest = await tenantPrisma.accessRequest.findFirst({
      where: {
        alumniId: alumniId,
        alumClassId: alumClassId,
      },
    });

    if (
      existingRequest ||
      alumni.alumniToClass.find(item => item.alumClassId === alumClassId)
    ) {
      throw new Error('exist request');
    }

    const request = await tenantPrisma.accessRequest.create({
      data: {
        alumni: {
          connect: {
            id: alumniId,
          },
        },
        alumClass: {
          connect: {
            id: alumClassId,
          },
        },
        fullName: alumni.information?.fullName || '',
        email: alumni.information?.email || '',
      },
    });

    await tenantPrisma.$disconnect();

    return request;
  };

  static withdrawRequestJoinClass = async (
    tenantPrisma: PrismaClient,
    {
      alumniId,
      requestId,
    }: {
      alumniId: string;
      requestId: string;
    },
  ) => {
    const alumni = await tenantPrisma.alumni.findUnique({
      where: {
        id: alumniId,
      },
      include: {
        information: {
          select: {
            fullName: true,
            email: true,
          },
        },
      },
    });

    if (!alumni) {
      throw new Error('non-exist alumni');
    }

    const existingRequest = await tenantPrisma.accessRequest.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!existingRequest || existingRequest.alumniId !== alumniId) {
      throw new Error('non-exist request');
    }

    const req = await tenantPrisma.accessRequest.delete({
      where: {
        id: requestId,
      },
    });

    await tenantPrisma.$disconnect();

    return req;
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

    if (accessRequest.alumniId) {
      await tenantPrisma.alumniToClass.create({
        data: {
          alumni: {
            connect: {
              id: accessRequest.alumniId,
            },
          },
          alumClass: {
            connect: {
              id: accessRequest.alumClassId,
            },
          },
        },
      });
    }

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
