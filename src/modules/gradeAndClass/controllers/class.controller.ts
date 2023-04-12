import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import { NextApiRequestWithTenant } from '@lib/next-connect';
import ClassService from '../services/class.service';
import getPrismaClient from '@lib/prisma/prisma';

export default class ClassController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { name, gradeId } = req.body;
      const prisma = await getPrismaClient(req.tenantId);
      const newClass = await ClassService.create(prisma, {
        gradeId: gradeId as string,
        name,
      });

      return res.status(201).json({
        status: true,
        data: newClass,
      });
    } catch (error) {
      if (error.message?.includes('invalid')) {
        return res.status(400).json({
          status: false,
          message: 'Invalid class name',
        });
      }

      if (error.message?.includes('Unique constraint')) {
        return res.status(400).json({
          status: false,
          message: 'New class is existed',
        });
      }

      if (error.message?.includes('grade')) {
        return res.status(400).json({
          status: false,
          message: 'Grade is not exist',
        });
      }

      throw error;
    }
  };

  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { grade_id: gradeId, page, limit, name } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const classListData = await ClassService.getList(prisma, {
        gradeId: gradeId as string,
        params: {
          page: page ? parseInt(page as string, 10) : 1,
          limit: limit ? parseInt(limit as string, 10) : 20,
          name: name ? (name as string) : '',
        },
      });

      return res.status(200).json({
        status: true,
        data: classListData,
      });
    } catch (error) {
      if (error.message?.includes('grade')) {
        return res.status(400).json({
          status: false,
          message: 'Grade is not exist',
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
    const classGotten = await ClassService.getById(prisma, id as string);

    return res.status(200).json({
      status: true,
      data: classGotten,
    });
  };

  static updateInfoById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const classUpdated = await ClassService.updateInfoById(
      prisma,
      id as string,
      req.body,
    );

    return res.status(200).json({
      status: true,
      data: classUpdated,
    });
  };

  static deleteById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const classDeleted = await ClassService.deleteById(prisma, id as string);

    return res.status(200).json({
      status: true,
      data: classDeleted,
    });
  };
}
