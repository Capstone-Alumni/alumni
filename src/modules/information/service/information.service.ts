import { prisma } from '@lib/prisma/prisma';
import { UpdateInformationProps } from '../types';

export default class InformationService {
  static updateInformationByUserId = async (
    id: string,
    body: UpdateInformationProps,
  ) => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const information = await prisma.information.findFirst({
      where: { userId: id },
    });

    const informationUpdated = information
      ? await prisma.information.update({
          where: { id: information.id },
          data: {
            ...body,
            user: {
              connect: {
                id: id,
              },
            },
          },
        })
      : await prisma.information.create({
          data: {
            ...body,
            user: {
              connect: {
                id: id,
              },
            },
          },
        });
    return informationUpdated;
  };

  static getInformationByUserId = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const information = await prisma.information.findFirst({
      where: { userId: id },
    });

    return information;
  };
}
