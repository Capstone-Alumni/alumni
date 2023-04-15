import {
  GetUsersInformationListServiceParams,
  UpdateInformationProps,
} from '../types';
import { Prisma, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import { omit } from 'lodash/fp';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';
import { Member } from 'src/modules/members/types';

const filterInformation = (
  alumniInformation: Member | null,
  requesterInformation: Member | null,
) => {
  const { information } = alumniInformation || {};

  if (!information || !alumniInformation) {
    return null;
  }

  if (alumniInformation.id === requesterInformation?.id) {
    return requesterInformation;
  }

  let result = { ...information } as any;
  if (
    !canViewInformationDetail(
      information.phonePublicity,
      alumniInformation,
      requesterInformation,
    )
  ) {
    result = omit('phone')(result);
  }

  if (
    !canViewInformationDetail(
      information.facebookPublicity,
      alumniInformation,
      requesterInformation,
    )
  ) {
    result = omit('facebookUrl')(result);
  }

  if (
    !canViewInformationDetail(
      information.dateOfBirthPublicity,
      alumniInformation,
      requesterInformation,
    )
  ) {
    result = omit('dateOfBirth')(result);
  }

  if (information.phone) {
    result.havePhone = true;
  }

  return {
    ...alumniInformation,
    information: result,
  };
};

export default class InformationService {
  static updateInformationByUserId = async (
    tenantPrisma: PrismaClient,
    id: string,
    body: UpdateInformationProps,
  ) => {
    const informationUpdated = await tenantPrisma.information.update({
      where: { userId: id },
      data: body,
    });
    return informationUpdated;
  };

  static getInformationByUserId = async (
    tenantPrisma: PrismaClient,
    user: User,
    alumniId: string,
  ) => {
    const requester = await tenantPrisma.alumni.findUnique({
      where: { id: user.id },
      include: {
        information: true,
        alumniToClass: {
          include: {
            alumClass: true,
          },
        },
        GradeMod: {
          include: {
            grade: true,
          },
        },
      },
    });

    const userInformation = await tenantPrisma.alumni.findUnique({
      where: { id: alumniId },
      include: {
        information: true,
        alumniToClass: {
          include: {
            alumClass: true,
          },
        },
        GradeMod: {
          include: {
            grade: true,
          },
        },
      },
    });

    return filterInformation(userInformation, requester);
  };

  static getUserInformationList = async (
    tenantPrisma: PrismaClient,
    user: User,
    params: GetUsersInformationListServiceParams,
  ) => {
    const { name, page, limit, classId, gradeId } = params;

    const requesterInformation = await tenantPrisma.information.findUnique({
      where: { userId: user.id },
      include: {
        alumClass: {
          include: {
            grade: true,
          },
        },
      },
    });

    const whereFilter: Prisma.InformationWhereInput = {
      fullName: { contains: name, mode: 'insensitive' },
      NOT: {
        userId: user.id,
      },
    };

    if (gradeId) {
      whereFilter.alumClass = {
        gradeId: gradeId,
      };
    }

    if (classId) {
      whereFilter.alumClassId = classId;
    }

    const [totalUsersInformation, usersInformationItems] =
      await tenantPrisma.$transaction([
        tenantPrisma.information.count({
          where: whereFilter,
        }),
        tenantPrisma.information.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: whereFilter,
          include: {
            alumClass: {
              include: {
                grade: true,
              },
            },
          },
        }),
      ]);

    const filteredInformationItems = usersInformationItems.map(information =>
      filterInformation(information, requesterInformation),
    );

    return {
      totalItems: totalUsersInformation,
      items: filteredInformationItems,
      itemPerPage: limit,
    };
  };

  static getAdminInformationList = async (
    tenantPrisma: PrismaClient,
    params: { page: number; limit: number },
  ) => {
    const { page, limit } = params;

    const whereFilter: Prisma.AlumniWhereInput = {
      accessLevel: {
        in: ['SCHOOL_ADMIN', 'GRADE_MOD'],
      },
      information: {
        isNot: undefined,
      },
    };

    const [totalUsersInformation, usersInformationItems] =
      await tenantPrisma.$transaction([
        tenantPrisma.alumni.count({
          where: whereFilter,
        }),
        tenantPrisma.alumni.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: whereFilter,
          include: {
            information: {
              select: {
                avatarUrl: true,
                fullName: true,
                email: true,
                alumClass: {
                  include: {
                    grade: true,
                  },
                },
              },
            },
          },
        }),
      ]);

    return {
      totalItems: totalUsersInformation,
      items: usersInformationItems,
      itemPerPage: limit,
    };
  };
}
