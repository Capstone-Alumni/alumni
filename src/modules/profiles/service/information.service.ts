import {
  GetUsersInformationListServiceParams,
  UpdateInformationProps,
} from '../types';
import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import { omit } from 'lodash/fp';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';

export default class InformationService {
  static updateInformationByUserId = async (
    tenantPrisma: PrismaClient,
    id: string,
    body: UpdateInformationProps,
  ) => {
    //TODO: sync users table from platform's database
    // then u can turn on this flag

    // const user = await tenantPrisma.user.findUnique({
    //   where: { id },
    // });
    // if (!user) {
    //   throw new Error('User not found');
    // }
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
    id: string,
  ) => {
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

    return userInformation;
  };

  static getUserInformationList = async (
    tenantPrisma: PrismaClient,
    user: User,
    params: GetUsersInformationListServiceParams,
  ) => {
    const { name, page, limit } = params;

    const requesterInformation = await tenantPrisma.information.findUnique({
      where: { userId: user.id },
      include: {
        alumClass: true,
      },
    });

    const [totalUsersInformation, usersInformationItems] =
      await tenantPrisma.$transaction([
        tenantPrisma.information.count({
          where: {
            fullName: { contains: name, mode: 'insensitive' },
          },
        }),
        tenantPrisma.information.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            fullName: { contains: name, mode: 'insensitive' },
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

    const filteredInformationItems = usersInformationItems.map(information => {
      if (!information) {
        return null;
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
    });

    return {
      totalItems: totalUsersInformation,
      items: filteredInformationItems,
      itemPerPage: limit,
    };
  };
}
