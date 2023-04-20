import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from '../../../types';
import getPrismaClient from '../../../lib/prisma/prisma';
import ReportService from '../services/reports.service';
import { sendMailService } from 'src/utils/emailSmsService';

export default class ReportsController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiErrorResponse | ApiSuccessResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);

      const created = await ReportService.create(prisma, req.body);
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
      const updated = await ReportService.update(
        prisma,
        id as string,
        req.body,
      );

      if (updated.response) {
        await sendMailService({
          to: updated.email,
          subject: 'Trả lời báo lỗi về việc sự cố khi sử dụng hệ thống',
          text: `
            <p>Kính gửi ${updated.fullName},</p>
            <p>${updated.response}</p>
            </pre>
          `,
        });
      }
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

  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { page, limit } = req.query;
      const listReport = await ReportService.getList(prisma, {
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
      });
      return res.status(200).json({
        status: true,
        data: listReport,
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
      const { id } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const reportDeleted = await ReportService.delete(prisma, id as string);
      return res.status(200).json({
        status: true,
        data: reportDeleted,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
}
