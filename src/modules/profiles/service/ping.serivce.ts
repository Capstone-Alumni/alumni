import { PrismaClient } from '@prisma/client';
import { sendSmsService } from 'src/utils/emailSmsService';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';

export default class PingService {
  static send = async (
    tenantPrisma: PrismaClient,
    userId: string,
    req: NextApiRequestWithTenant,
  ) => {
    const newPing = await tenantPrisma.ping.create({
      data: {
        message: req.body.message,
        pingerInfo: {
          connect: {
            userId: req.user.id,
          },
        },
        pingAlumniInfoId: userId,
      },
    });

    const userInformation = await tenantPrisma.information.findUnique({
      where: { userId },
      include: {
        alumClass: {
          include: {
            grade: true,
          },
        },
      },
    });

    console.log(userInformation);

    if (userInformation?.phone) {
      await sendSmsService({
        to: `+84${userInformation?.phone}`,
        body: req.body.message,
      });

      return newPing;
    }
    return null;
  };
}
