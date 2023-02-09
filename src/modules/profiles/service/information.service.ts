import { omit } from 'lodash';
import {
  GetUsersInformationListServiceParams,
  UpdateInformationProps,
} from '../types';
import { PrismaClient } from '@prisma/client';

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
    const userInformation = await tenantPrisma.user.findUnique({
      where: { id },
      include: {
        information: true,
      },
    });

    return omit(userInformation, ['password']);
  };

  static getUsersInformationByName = async (
    tenantPrisma: PrismaClient,
    params: GetUsersInformationListServiceParams,
  ) => {
    const { name, page, limit } = params;

    const whereFilter = {
      AND: [{ fullName: { contains: name } }],
    };

    const [totalUsersInformation, usersInformationItems] =
      await tenantPrisma.$transaction([
        tenantPrisma.information.count({ where: whereFilter }),
        tenantPrisma.information.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: {
            fullName: {
              contains: name,
              mode: 'insensitive',
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
