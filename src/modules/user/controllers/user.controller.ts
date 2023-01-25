import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import UserService from '../services/user.service';

export default class UserController {
  static verifyAccount = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const accountUpdated = await UserService.updateInfoById(
      id as string,
      req.body,
    );
    return res.status(200).json({
      status: true,
      data: accountUpdated,
    });
  };
}
