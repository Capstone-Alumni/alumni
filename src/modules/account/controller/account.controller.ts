import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import AccountService from '../service/account.service';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '../../../lib/prisma/prisma';

export default class AccountController {
  static update = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    prisma = await getPrismaClient(req.tenantId);
    // TODO: handle authorization, wait for middleware on BE
    const accountUpdated = await AccountService.update(
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
