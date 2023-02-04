import { omit } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import EducationServices from '../service/education.service';
import { QueryParamGetEducationByUserId } from '../types';

export default class EducationController {
  static async create(
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) {
    const { id: userId } = req.query;
    const educationCreated = await EducationServices.createEducation(
      userId as string,
      req.body,
    );
    return res.status(201).json({
      status: true,
      data: educationCreated,
    });
  }

  static async createManyRecords(
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) {
    const { id: userId } = req.query;
    const educationCreated = await EducationServices.bulkCreate(
      userId as string,
      req.body,
    );
    return res.status(201).json({
      status: true,
      data: educationCreated,
    });
  }

  static updateEducation = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId, educationId } = req.query;
    const educationUpdated = await EducationServices.updateEducation(
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
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId, educationId } = req.query;
    const educationDeleted = await EducationServices.deleteEducationByEduId(
      userId as string,
      educationId as string,
    );
    return res.status(200).json({
      status: true,
      data: educationDeleted,
    });
  };

  static getEducationByEduId = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id: userId, educationId } = req.query;
    const education = await EducationServices.getEducationByEduId(
      userId as string,
      educationId as string,
    );
    return res.status(200).json({
      status: true,
      data: education,
    });
  };

  static getEducationsByUserId = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const params = omit(req.query, ['id']);
    const { id: userId } = req.query;
    const userEducations = await EducationServices.getEducationsByUserId(
      userId as string,
      params as unknown as QueryParamGetEducationByUserId,
    );

    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({
      status: true,
      data: userEducations,
    });
  };
}
