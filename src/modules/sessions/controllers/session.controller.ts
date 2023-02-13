import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import SessionService from '../services/session.service';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '@lib/prisma/prisma';

export default class SessionController {
  static signUp = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const newAlum = await SessionService.signUp(prisma, req.body);
      return res.status(201).json({
        status: true,
        data: newAlum,
      });
    } catch (error) {
      if (error.message === 'existed') {
        return res.status(400).json({
          status: false,
          message: 'Username or Email is already existed',
        });
      }

      throw error;
    }
  };

  static signIn = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const user = await SessionService.signIn(prisma, req.body);
      return res.status(200).json({
        status: true,
        data: user,
      });
    } catch (error) {
      if (error.message === 'sign-in failed') {
        return res.status(400).json({
          status: false,
          message: 'Wrong username or password',
        });
      }

      throw error;
    }
  };
}
