import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from '../../../types';
import getPrismaClient from '../../../lib/prisma/prisma';
import RecruimentService from '../services/recruitments.service';
export default class RecruitmentController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiErrorResponse | ApiSuccessResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const recruitmentOwnerId = req.user.id;
      const created = await RecruimentService.create(
        prisma,
        recruitmentOwnerId,
        req.body,
      );
      return res.status(200).json({
        status: true,
        data: created,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static update = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id } = req.query;
      const updated = await RecruimentService.create(
        prisma,
        id as string,
        req.body,
      );
      return res.status(200).json({
        status: true,
        data: updated,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static delete = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id } = req.query;
      const deleted = await RecruimentService.delete(prisma, id as string);
      return res.status(200).json({
        status: true,
        data: deleted,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getListByApproved = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { page, limit, companyName, job, salary, position, type } =
        req.query;
      const listRecruitment = await RecruimentService.getAprovedList(prisma, {
        companyName: companyName ? (companyName as string) : '',
        job: job ? (job as string) : '',
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
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getByIdAndApproved = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id } = req.query;
      const getById = await RecruimentService.getApprovedDetailRecruitment(
        prisma,
        id as string,
      );
      return res.status(200).json({
        status: true,
        data: getById,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getListByOwnerId = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: recruitmentOwnerId } = req.user;
      const { page, limit } = req.query;
      const listByOwner = await RecruimentService.getListByOwnerId(prisma, {
        recruitmentOwnerId,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
      });
      return res.status(200).json({
        data: listByOwner,
        status: true,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
}
