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
    try {
      const { id: userId } = req.query;
      const educationCreated = await EducationServices.createEducation(
        userId as string,
        req.body,
      );
      return res.status(201).json({
        status: true,
        data: educationCreated,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }

  static updateEducation = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
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
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static deleteducation = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id: userId, educationId } = req.query;
      const educationDeleted = await EducationServices.deleteEducationByEduId(
        userId as string,
        educationId as string,
      );
      return res.status(200).json({
        status: true,
        data: educationDeleted,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getEducationByEduId = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id: userId, educationId } = req.query;
      const education = await EducationServices.getEducationByEduId(
        userId as string,
        educationId as string,
      );
      return res.status(200).json({
        status: true,
        data: education,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getEducationsByUserId = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const params = omit(req.query, ['id']);
      const { id: userId } = req.query;
      const userEducations = await EducationServices.getEducationsByUserId(
        userId as string,
        params as unknown as QueryParamGetEducationByUserId,
      );
      return res.status(200).json({
        status: true,
        data: userEducations,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
}
