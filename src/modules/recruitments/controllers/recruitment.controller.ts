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

}
