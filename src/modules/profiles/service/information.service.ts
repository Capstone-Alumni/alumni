import {
  GetUsersInformationListServiceParams,
  InformationIncludeClass,
  UpdateInformationProps,
} from '../types';
import { Prisma, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import { omit } from 'lodash/fp';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';

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
  let result = { ...information } as any;
  if (
    !canViewInformationDetail(
      information.phonePublicity,
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    result = omit('phone')(result);
  }

  if (
    !canViewInformationDetail(
      information.facebookPublicity,
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    result = omit('facebookUrl')(result);
  }

  if (
    !canViewInformationDetail(
      information.dateOfBirthPublicity,
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    result = omit('dateOfBirth')(result);
  }

  return result;
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
