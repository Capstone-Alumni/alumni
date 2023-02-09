import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '../../../lib/prisma/prisma';
import AccessRequestService from '../services/accessRequest.service';

export default class AccessRequestController {
  static verifyAccount = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const accountUpdated = await AccessRequestService.verifyAccount(
      prisma,
      id as string,
      req.body,
    );
    return res.status(200).json({
      status: true,
      data: accountUpdated,
    });
  };
}
