import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import OwnerEventService from '../services/ownerEvent.service';

export default class OwnerEventController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { page, limit } = req.query;

    const listData = await OwnerEventService.getList(prisma, {
      userId,
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
    const { id: userId } = req.user;
    const { id } = req.query;

    const data = await OwnerEventService.getById(prisma, {
      userId,
      eventId: id as string,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;

    const data = await OwnerEventService.create(prisma, userId, req.body);

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static updateById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { id } = req.query;

    const data = await OwnerEventService.updateById(
      prisma,
      userId,
      id as string,
      req.body,
    );

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static deleteById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;

      const data = await OwnerEventService.deleteById(
        prisma,
        userId,
        id as string,
      );

      return res.status(200).json({
        data: data,
        status: true,
      });
    } catch (err) {
      if (err.message.contains('denied')) {
        return res.status(403).json({
          message: 'Event is not exist or you are not the owner.',
          status: false,
        });
      }

      throw err;
    }
  };

  static getGoingList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { page, limit, title } = req.query;

    const listData = await OwnerEventService.getGoingList(prisma, {
      userId,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      title: title as string,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };

  static getInterestList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { page, limit, title } = req.query;

    const listData = await OwnerEventService.getInterestList(prisma, {
      userId,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
      title: title as string,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };
}
