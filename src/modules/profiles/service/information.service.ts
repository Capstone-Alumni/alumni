import {
  GetUsersInformationListServiceParams,
  UpdateInformationProps,
} from '../types';
import {
  AlumClass,
  Grade,
  Information,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import { User } from 'next-auth';
import { omit } from 'lodash/fp';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';

type InformationIncludeClass = Information & {
  alumClass:
    | (AlumClass & {
        grade: Grade;
      })
    | null;
};

const filterInformation = (
  information: InformationIncludeClass | null,
  requesterInformation: InformationIncludeClass | null,
) => {
  if (!information) {
    return null;
  }

  if (information.userId === requesterInformation?.userId) {
    return information;
  }

  if (
    !canViewInformationDetail(
      information.phonePublicity,
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    omit('phone')(information);
  }

  if (
    !canViewInformationDetail(
      information.facebookPublicity,
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    omit('facebookUrl')(information);
  }

  if (
    !canViewInformationDetail(
      information.dateOfBirthPublicity,
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    omit('dateOfBirth')(information);
  }

  return information;
};

export default class InformationService {
  static updateInformationByUserId = async (
    tenantPrisma: PrismaClient,
    id: string,
    body: UpdateInformationProps,
  ) => {
    const informationUpdated = await tenantPrisma.information.upsert({
      where: { userId: id },
      update: body,
      create: {
        ...body,
        userId: id,
      },
    });
    return informationUpdated;
  };

  static getInformationByUserId = async (
    tenantPrisma: PrismaClient,
    user: User,
    id: string,
  ) => {
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

    const userInformation = await tenantPrisma.information.findUnique({
      where: { userId: id },
      include: {
        alumClass: {
          include: {
            grade: true,
          },
        },
      },
    });

    return filterInformation(userInformation, requesterInformation);
  };

  static getUserInformationList = async (
    tenantPrisma: PrismaClient,
    user: User,
    params: GetUsersInformationListServiceParams,
  ) => {
    const { name, page, limit, classId } = params;

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
}
