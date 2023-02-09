import { VerifyAccountInfoServiceProps } from '../types';
import { PrismaClient } from '@prisma/client';

export default class AccessRequestService {
  static verifyAccount = async (
    tenantPrisma: PrismaClient,
    id: string,
    data: VerifyAccountInfoServiceProps,
  ) => {
    const infoUpdated = await tenantPrisma.information.upsert({
      where: {
        userId: id,
      },
      update: {
        fullName: data.fullName,
        class: {
          connect: {
            id: data.classId,
          },
        },
      },
      create: {
        userId: id,
        fullName: data.fullName,
        email: data.email,
        class: {
          connect: {
            id: data.classId,
          },
        },
      },
    });

    return infoUpdated;
  };
}
