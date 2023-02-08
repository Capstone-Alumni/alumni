import { UpdateAccountInfoServiceProps } from '../types';
import { PrismaClient } from '@prisma/client';

export default class UserService {
  static updateInfoById = async (
    tenantPrisma: PrismaClient,
    id: string,
    data: UpdateAccountInfoServiceProps,
  ) => {
    const infoUpdated = await tenantPrisma.user.update({
      where: {
        id: id,
      },
      data: data,
    });

    return infoUpdated;
  };
}
