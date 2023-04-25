import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '../../../lib/prisma/prisma';
import AccessRequestService from '../services/accessRequest.service';
import { sendMailService } from 'src/utils/emailSmsService';

export default class AccessRequestController {
  static verifyAccount = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id: userId, accessLevel } = req.user;
      const prisma = await getPrismaClient(req.tenantId);

      const accountUpdated = await AccessRequestService.verifyAccount(prisma, {
        ...req.body,
        userId,
        accessLevel,
      });
      return res.status(200).json({
        status: true,
        data: accountUpdated,
      });
    } catch (err) {
      return res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  };

  static getAccessRequestList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.user;
    const { page, limit, status } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const accessRequestList = await AccessRequestService.getAccessRequestList(
      prisma,
      {
        alumniId: id as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 99,
        status: status ? parseInt(limit as string, 10) : undefined,
      },
    );
    return res.status(200).json({
      status: true,
      data: accessRequestList,
    });
  };

  static getOwnedAccessStatus = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);

    const accountUpdated = await AccessRequestService.getOwnedAccessStatus(
      prisma,
      req.user,
    );
    return res.status(200).json({
      status: true,
      data: accountUpdated,
    });
  };

  static requestJoinClass = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);

      const accountUpdated = await AccessRequestService.requestJoinClass(
        prisma,
        {
          alumniId: req.user.id,
          alumClassId: req.body.alumClassId,
        },
      );
      return res.status(200).json({
        status: true,
        data: accountUpdated,
      });
    } catch (err) {
      if (err.message.includes('non-exist')) {
        return res.status(400).json({
          status: false,
          message: 'Alumni not exist',
        });
      }
      if (err.message.includes('exist')) {
        return res.status(400).json({
          status: false,
          message: 'Request exist',
        });
      }
      throw err;
    }
  };

  static withdrawRequestJoinClass = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);

      const accountUpdated =
        await AccessRequestService.withdrawRequestJoinClass(prisma, {
          alumniId: req.user.id,
          requestId: req.query.id as string,
        });
      return res.status(200).json({
        status: true,
        data: accountUpdated,
      });
    } catch (err) {
      if (err.message.includes('non-exist')) {
        return res.status(400).json({
          status: false,
          message: 'Alumni or Request not exist',
        });
      }
      throw err;
    }
  };

  static rejectAccessRequest = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const accessRequest = await AccessRequestService.rejectAccessRequest(
      prisma,
      {
        id: id as string,
      },
    );

    await sendMailService({
      to: accessRequest.email,
      subject: 'Từ chối yêu cầu gia nhập',
      text: `
Yêu cầu tham gia cộng đồng cựu học sinh của bạn đã bị từ chối.

      `,
    });

    return res.status(200).json({
      status: true,
      data: accessRequest,
    });
  };

  // has callback, see useApproveAccessRequest.ts
  static approveAccessRequest = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const accessRequest = await AccessRequestService.approveAccessRequest(
      prisma,
      {
        id: id as string,
      },
    );
    return res.status(200).json({
      status: true,
      data: accessRequest,
    });
  };
}
