import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import AdminEventService from '../services/adminEvent.service';

export default class AdminEventController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit, title } = req.query;

    const listData = await AdminEventService.getList(prisma, {
      user: req.user,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      title: title as string,
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

    const data = await AdminEventService.getById(prisma, {
      user: req.user,
      eventId: id as string,
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

    const data = await AdminEventService.approve(prisma, {
      user: req.user,
      eventId: id as string,
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

    const data = await AdminEventService.reject(prisma, {
      user: req.user,
      eventId: id as string,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };
}
