import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import AccountService from '../service/account.service';

export default class AccountController {
  static update = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    // TODO: handle authorization, wait for middleware on BE
    const accountUpdated = await AccountService.update(id as string, req.body);

    return res.status(200).json({
      status: true,
      data: accountUpdated,
    });
  };
}
