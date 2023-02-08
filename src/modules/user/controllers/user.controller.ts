import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import UserService from '../services/user.service';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '../../../lib/prisma/prisma';

export default class UserController {
  static verifyAccount = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const accountUpdated = await UserService.updateInfoById(
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
