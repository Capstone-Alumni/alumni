import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import GradeService from '../services/grade.service';

export default class GradeController {
  static getPublicList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit, code } = req.query;
    const gradeListData = await GradeService.getPublicList(prisma, {
      params: {
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
        code: code ? (code as string) : '',
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
      const { code } = req.body;
      const prisma = await getPrismaClient(req.tenantId);
      const newGrade = await GradeService.create(prisma, { code });

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

  static createMany = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { data } = req.body;
      const prisma = await getPrismaClient(req.tenantId);
      const newGrade = await GradeService.createMany(prisma, { data });

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
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const grade = await GradeService.getById(prisma, id as string);

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };

  static updateInfoById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const grade = await GradeService.updateInfoById(
      prisma,
      id as string,
      req.body,
    );

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };

  static deleteById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const grade = await GradeService.deleteById(prisma, id as string);

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };
}
