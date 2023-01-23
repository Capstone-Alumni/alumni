import { prisma } from '@lib/prisma/prisma';
import { UpdateAccountInfoServiceProps } from '../types';

export default class UserService {
  static updateInfoById = async (
    id: string,
    data: UpdateAccountInfoServiceProps,
  ) => {
    const infoUpdated = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    return infoUpdated;
  };
}
