import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import GradeService from '../services/grade.service';

export default class GradeController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const newGrade = await GradeService.create(prisma, req.body);

      return res.status(201).json({
        status: true,
        data: newGrade,
      });
    } catch (error) {
      if (
        error.message?.includes('existed') ||
        error.message?.includes('Unique constraint')
      ) {
        return res.status(400).json({
          status: false,
          message: 'Grade is existed',
        });
      }

      throw error;
    }
  };

  static clone = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const newGrade = await GradeService.clone(prisma, id as string);

      return res.status(201).json({
        status: true,
        data: newGrade,
      });
    } catch (error) {
      console.log(error);
      if (error.message?.includes('not exist')) {
        return res.status(400).json({
          status: false,
          message: 'Grade is not exist',
        });
      }

      if (
        error.message?.includes('existed') ||
        error.message?.includes('Unique constraint')
      ) {
        return res.status(400).json({
          status: false,
          message: 'New grade is existed',
        });
      }

      throw error;
    }
  };

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

  static addGradeMod = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const { alumniId } = req.body;
    const prisma = await getPrismaClient(req.tenantId);
    const grade = await GradeService.addGradeMod(prisma, {
      gradeId: id as string,
      alumniId: alumniId as string,
    });

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };

  static removeGradeMod = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id, alumniId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const grade = await GradeService.removeGradeMod(prisma, {
      gradeId: id as string,
      alumniId: alumniId as string,
    });

    return res.status(200).json({
      status: true,
      data: grade,
    });
  };
}
