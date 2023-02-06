import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import CareerService from '../service/career.serivce';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '@lib/prisma/prisma';

export default class CareerController {
  static createCareer = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const newCareer = await CareerService.create(
      prisma,
      id as string,
      req.body,
    );

    return res.status(201).json({
      status: true,
      data: newCareer,
    });
  };

  static getListByUserId = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id, jobTitle, company, page, limit } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const careerList = await CareerService.getListByUserId(
      prisma,
      id as string,
      {
        jobTitle: jobTitle ? (jobTitle as string) : '',
        company: company ? (company as string) : '',
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
      },
    );

    return res.status(200).json({
      status: true,
      data: careerList,
    });
  };

  static getById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { careerId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const career = await CareerService.getById(prisma, careerId as string);
    return res.status(200).json({
      status: true,
      data: career,
    });
  };

  static updateCareerById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { careerId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const careerUpdated = await CareerService.updateCareerById(
      prisma,
      careerId as string,
      req.body,
    );
    return res.status(200).json({
      status: true,
      data: careerUpdated,
    });
  };

  static updateCareers = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const careerUpdated = await CareerService.createMany(
      prisma,
      id as string,
      req.body,
    );
    return res.status(200).json({
      status: true,
      data: careerUpdated,
    });
  };

  static deleteById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { careerId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const careerDeleted = await CareerService.deleteById(
      prisma,
      careerId as string,
    );

    return res.status(200).json({
      status: true,
      data: careerDeleted,
    });
  };
}
