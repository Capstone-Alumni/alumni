import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import OwnerFundService from '../services/ownerFund.service';

export default class OwnerFundController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { page, limit } = req.query;

    const listData = await OwnerFundService.getList(prisma, {
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

    const data = await OwnerFundService.getById(prisma, {
      userId,
      fundId: id as string,
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

    const data = await OwnerFundService.create(prisma, userId, req.body);

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

    const data = await OwnerFundService.updateById(
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

      const data = await OwnerFundService.deleteById(
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
          message: 'Fund is not exist or you are not the owner.',
          status: false,
        });
      }

      throw err;
    }
  };

  static getSavedList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { page, limit } = req.query;

    const listData = await OwnerFundService.getSavedList(prisma, {
      userId,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 10,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };
}
