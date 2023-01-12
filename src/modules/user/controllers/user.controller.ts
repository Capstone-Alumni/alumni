import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import UserService from '../services/user.service';

export default class UserController {
  static verifyAccount = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const accountUpdated = await UserService.updateInfoById(
        id as string,
        req.body,
      );
      return res.status(200).json({
        status: true,
        data: accountUpdated,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };
}
