import { prisma } from '@lib/prisma/prisma';
import { omit } from 'lodash';
import { UpdateInformationProps } from '../types';

export default class InformationService {
  static updateInformationByUserId = async (
    id: string,
    body: UpdateInformationProps,
  ) => {
    //TODO: sync users table from platform's database 
    // then u can turn on this flag 
    const user = await prisma.user.findUnique({
      where: { id },
    });
    // if (!user) {
    //   throw new Error('User not found');
    // }
    const informationUpdated = await prisma.information.upsert({
      where: { userId: id },
      update: body,
      create: {
        ...body,
        user: {
          create: {
            id: id,
          },
        },
      },
    });
    return informationUpdated;
  };

  static getInformationByUserId = async (id: string) => {
    const userInformation = await prisma.user.findUnique({
      where: { id },
      include: {
        information: true,
      },
    });

    return omit(userInformation, ['password']);
  };
}
