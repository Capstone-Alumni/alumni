import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import InformationService from '../service/information.service';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '@lib/prisma/prisma';

export default class InformationController {
  static updateInformationByUserId = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    // TODO: handle authorization, wait for middleware on BE
    const prisma = await getPrismaClient(req.tenantId);
    const informationUpdated =
      await InformationService.updateInformationByUserId(
        prisma,
        id as string,
        req.body,
      );
    return res.status(200).json({
      status: true,
      data: informationUpdated,
    });
  };

  static getInformationByUserId = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const information = await InformationService.getInformationByUserId(
      prisma,
      req.user,
      id as string,
    );

    return res.status(200).json({
      status: true,
      data: information,
    });
  };

  static getUserInfomationList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse,
  ) => {
    const { name, classId, page, limit } = req.query;
    const prisma = await getPrismaClient(req.tenantId);

    const userInformationList = await InformationService.getUserInformationList(
      prisma,
      req.user,
      {
        name: name ? (name as string) : '',
        classId: classId ? (classId as string) : '',
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
      },
    );

    return res.status(200).json({
      status: true,
      data: userInformationList,
    });
  };
}
