import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import PublicEventService from '../services/publicEvent.service';

export default class PublicEventController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit } = req.query;

    const listData = await PublicEventService.getList(prisma, {
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

    const data = await PublicEventService.getById(prisma, {
      eventId: id as string,
      userId: userId,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static joinEvent = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;

      const data = await PublicEventService.joinEvent(prisma, {
        eventId: id as string,
        userId: userId,
      });

      return res.status(200).json({
        data: data,
        status: true,
      });
    } catch (err) {
      if (err.message.contains('404')) {
        return res.status(400).json({
          message: 'Event does not exist or is not approved',
          status: false,
        });
      }

      throw err;
    }
  };

  static getParticipantList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit } = req.query;
    const { id } = req.query;

    const listData = await PublicEventService.getParticipantList(prisma, {
      eventId: id as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };

  static interestEvent = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;

      const data = await PublicEventService.interestEvent(prisma, {
        eventId: id as string,
        userId: userId,
      });

      return res.status(200).json({
        data: data,
        status: true,
      });
    } catch (err) {
      if (err.message.contains('404')) {
        return res.status(400).json({
          message: 'Event does not exist or is not approved',
          status: false,
        });
      }

      throw err;
    }
  };

  static uninterestEvent = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;

      const data = await PublicEventService.uninterestEvent(prisma, {
        eventId: id as string,
        userId: userId,
      });

      return res.status(200).json({
        data: data,
        status: true,
      });
    } catch (err) {
      if (err.message.contains('404')) {
        return res.status(400).json({
          message: 'Event does not exist or is not approved',
          status: false,
        });
      }

      throw err;
    }
  };
}
