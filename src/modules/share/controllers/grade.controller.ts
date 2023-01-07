import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import GradeService from '../services/grade.service';

export default class GradeController {
  static getPublicList = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { page, limit, code, name } = req.query;
      const gradeListData = await GradeService.getPublicList({
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
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };

  static create = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { name, code } = req.body;
      const newGrade = await GradeService.create({ name, code });

      return res.status(201).json({
        status: true,
        data: newGrade,
      });
    } catch (error: any) {
      if (error.message.contains('existed')) {
        return res.status(400).json({
          status: false,
          message: "Grade's code is existed",
        });
      }

      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };

  static getById = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const grade = await GradeService.getById(id as string);

      return res.status(200).json({
        status: true,
        data: grade,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };

  static updateInfoById = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const grade = await GradeService.updateInfoById(id as string, req.body);

      return res.status(200).json({
        status: true,
        data: grade,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };

  static deleteById = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id } = req.query;
      const grade = await GradeService.deleteById(id as string);

      return res.status(200).json({
        status: true,
        data: grade,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };
}
