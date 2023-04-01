import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import PingService from '../service/ping.serivce';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '@lib/prisma/prisma';
// import { sendSmsService } from 'src/utils/emailSmsService';

export default class PingController {
  static sendMessage = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const newPing = await PingService.send(prisma, id as string, req);
    if (newPing) {
      return res.status(200).json({
        status: true,
        data: newPing,
      });
    }
    return res.status(500).json({
      message: 'Xảy ra lỗi',
      status: false,
    });
  };
}
