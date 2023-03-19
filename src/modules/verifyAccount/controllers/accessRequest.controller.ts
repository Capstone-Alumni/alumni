import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '../../../lib/prisma/prisma';
import AccessRequestService from '../services/accessRequest.service';

export default class AccessRequestController {
  static verifyAccount = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
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
  };

  static getAccessRequestList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId } = req.user;
    const { page, limit } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const accessRequestList = await AccessRequestService.getAccessRequestList(
      prisma,
      {
        userId,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 99,
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
    return res.status(200).json({
      status: true,
      data: accessRequest,
    });
  };

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
