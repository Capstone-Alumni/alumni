import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient, {prisma} from '@lib/prisma/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import GradeService from '../services/grade.service';

export default class GradeController {
  static getPublicList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    // const prisma = await getPrismaClient(req.tenantId);
    const { page, limit, code, name } = req.query;
    const gradeListData = await GradeService.getPublicList(prisma, {
      params: {
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
        code: code ? (code as string) : '',
        name: name ? (name as string) : '',
      },
    });

    return res.status(200).json({
      status: true,
      data: gradeListData,
    });
  };

  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { name, code } = req.body;
      // const prisma = await getPrismaClient(req.tenantId);
      const newGrade = await GradeService.create(prisma, { name, code });

      return res.status(201).json({
        status: true,
        data: newGrade,
      });
    } catch (error) {
      if (error.message?.includes('existed')) {
        return res.status(400).json({
          status: false,
          message: "Grade's code is existed",
        });
      }

      throw error;
    }
  };

  static getById = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const grade = await GradeService.getById(id as string);

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };

  static updateInfoById = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const grade = await GradeService.updateInfoById(id as string, req.body);

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };

  static deleteById = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const grade = await GradeService.deleteById(id as string);

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };
}
