import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '../../../lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import ApplicationService from '../services/recruitmentApplictation.service';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
export default class ApplicationController {
  static applyRecruitment = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiErrorResponse | ApiSuccessResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: userId } = req.user;
      const { id } = req.query;
      const apply = await ApplicationService.apply(
        prisma,
        id as string,
        userId as string,
        req.body,
      );
      return res.status(200).json({
        data: apply,
        status: true,
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
    res: NextApiResponse<ApiErrorResponse | ApiSuccessResponse>,
  ) => {
    try {
      prisma = await getPrismaClient(req.tenantId);
      const { applicationId } = req.query;
      const { id: userId } = req.user;
      const updated = await ApplicationService.update(
        prisma,
        applicationId as string,
        userId,
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
      const session = await getServerSession(req, res, nextAuthOptions);

      const isSchoolAdmin = session?.user.isOwner || false;

      const prisma = await getPrismaClient(req.tenantId);
      const { applicationId } = req.query;
      const { id: userId } = req.user;
      const deleted = await ApplicationService.delete(
        prisma,
        applicationId as string,
        userId as string,
        isSchoolAdmin,
      );
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

  static getAppliedList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiErrorResponse | ApiSuccessResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id } = req.query;
      const { page, limit } = req.query;

      const AppliedList = await ApplicationService.getAppliedList(prisma, {
        recruitmentId: id as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 10,
      });
      return res.status(200).json({
        data: AppliedList,
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
