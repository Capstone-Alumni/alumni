import { omit } from 'lodash';
import { UpdateInformationProps } from '../types';
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
}
