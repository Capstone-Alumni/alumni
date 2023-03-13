import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import ReportFundService from '../services/reportFund.service';

export default class ReportFundController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { id } = req.query;
    const data = await ReportFundService.create(
      prisma,
      id as string,
      userId,
      req.body,
    );

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static update = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { reportId } = req.query;

    const data = await ReportFundService.update(
      prisma,
      reportId as string,
      userId,
      req.body,
    );

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static delete = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: userId } = req.user;
    const { reportId } = req.query;

    const data = await ReportFundService.delete(
      prisma,
      reportId as string,
      userId,
    );

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static getById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { reportId } = req.query;

    const data = await ReportFundService.getById(prisma, reportId as string);

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const list = await ReportFundService.getList(prisma, id as string);

    return res.status(200).json({
      data: list,
      status: true,
    });
  };
}
