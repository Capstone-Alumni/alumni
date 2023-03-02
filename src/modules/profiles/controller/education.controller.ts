import { omit } from 'lodash';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import EducationServices from '../service/education.service';
import { QueryParamGetEducationByUserId } from '../types';
import { NextApiRequestWithTenant } from '../../../lib/next-connect/index';
import getPrismaClient from '@lib/prisma/prisma';

export default class EducationController {
  static async create(
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) {
    const { id: userId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const educationCreated = await EducationServices.createEducation(
      prisma,
      userId as string,
      req.body,
    );
    return res.status(201).json({
      status: true,
      data: educationCreated,
    });
  }

  static async createManyRecords(
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) {
    const { id: userId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const educationCreated = await EducationServices.bulkCreate(
      prisma,
      userId as string,
      req.body,
    );
    return res.status(201).json({
      status: true,
      data: educationCreated,
    });
  }

  static updateEducation = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId, educationId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const educationUpdated = await EducationServices.updateEducation(
      prisma,
      userId as string,
      educationId as string,
      req.body,
    );
    return res.status(200).json({
      status: true,
      data: educationUpdated,
    });
  };

  static deleteducation = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId, educationId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const educationDeleted = await EducationServices.deleteEducationByEduId(
      prisma,
      userId as string,
      educationId as string,
    );
    return res.status(200).json({
      status: true,
      data: educationDeleted,
    });
  };

  static getEducationByEduId = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId, educationId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const education = await EducationServices.getEducationByEduId(
      prisma,
      userId as string,
      educationId as string,
    );
    return res.status(200).json({
      status: true,
      data: education,
    });
  };

  static getEducationsByUserId = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const params = omit(req.query, ['id']);
    const { id: userId } = req.query;
    const prisma = await getPrismaClient(req.tenantId);
    const user = req.user;
    const userEducations = await EducationServices.getEducationsByUserId(
      prisma,
      userId as string,
      user,
      params as unknown as QueryParamGetEducationByUserId,
    );

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      status: true,
      data: userEducations,
    });
  };
}
