import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import AdminFundService from '../services/adminFund.service';

export default class AdminFundController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit, approved } = req.query;

    const listData = await AdminFundService.getList(prisma, {
      user: req.user,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      approved: approved ? parseInt(approved as string, 10) : undefined,
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

    const data = await AdminFundService.getById(prisma, {
      user: req.user,
      fundId: id as string,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static approve = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await AdminFundService.approve(prisma, {
      user: req.user,
      fundId: id as string,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static reject = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await AdminFundService.reject(prisma, {
      user: req.user,
      fundId: id as string,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };
}
