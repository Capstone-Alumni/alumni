import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import PublicFundService from '../services/publicFund.service';

export default class PublicFundController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit } = req.query;
    const { id: userId } = req.user;

    const listData = await PublicFundService.getList(prisma, {
      userId: userId,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };

  static getById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;
    const { id: userId } = req.user || {};

    const data = await PublicFundService.getById(prisma, {
      fundId: id as string,
      userId: userId,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static saveFund = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;

      const data = await PublicFundService.saveFund(prisma, {
        fundId: id as string,
        userId: userId,
      });

      return res.status(200).json({
        data: data,
        status: true,
      });
    } catch (err) {
      if (err.message.contains('404')) {
        return res.status(400).json({
          message: 'Fund does not exist or is not approved',
          status: false,
        });
      }

      throw err;
    }
  };

  static unsaveFund = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;

      const data = await PublicFundService.unsaveFund(prisma, {
        fundId: id as string,
        userId: userId,
      });

      return res.status(200).json({
        data: data,
        status: true,
      });
    } catch (err) {
      if (err.message.contains('404')) {
        return res.status(400).json({
          message: 'Fund does not exist or is not approved',
          status: false,
        });
      }

      throw err;
    }
  };
}
