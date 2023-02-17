import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from '../../../types';
import getPrismaClient from '../../../lib/prisma/prisma';
import AdminRecruitmentService from '../services/adminRecruitment.service';
export default class AdminRecruitmentController {
  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit, companyName, job, salary, position, type } = req.query;
    const listRecruitment = await AdminRecruitmentService.getList(prisma, {
      job: job ? (job as string) : '',
      companyName: companyName ? (companyName as string) : '',
      salary: salary ? (salary as string) : '',
      position: position ? (position as string) : '',
      type: type ? (type as string) : '',
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20,
    });
    return res.status(200).json({
      status: true,
      data: listRecruitment,
    });
  };

  static getById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;
    const recruitment = await AdminRecruitmentService.getById(
      prisma,
      id as string,
    );
    return res.status(200).json({
      status: true,
      data: recruitment,
    });
  };

  static approve = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;
    const approveRecruitment = await AdminRecruitmentService.approve(
      prisma,
      id as string,
    );
    return res.status(200).json({
      status: true,
      data: approveRecruitment,
    });
  };

  static reject = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;
    const rejectRecruitment = await AdminRecruitmentService.reject(
      prisma,
      id as string,
    );
    return res.status(200).json({
      status: true,
      data: rejectRecruitment,
    });
  };
}
