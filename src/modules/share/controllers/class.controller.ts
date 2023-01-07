import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import ClassService from '../services/class.service';

export default class ClassController {
  static create = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id: gradeId } = req.query;
      const { name } = req.body;
      const newClass = await ClassService.create({
        gradeId: gradeId as string,
        name,
      });

      return res.status(201).json({
        status: true,
        data: newClass,
      });
    } catch (error: any) {
      if (error.message?.includes('invalid')) {
        return res.status(400).json({
          status: false,
          message: 'Invalid class name',
        });
      }

      if (error.message?.includes('grade')) {
        return res.status(400).json({
          status: false,
          message: 'Grade is not exist',
        });
      }

      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };

  static getList = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id: gradeId } = req.query;
      const { page, limit, name } = req.query;
      const classListData = await ClassService.getList({
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
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error as string,
      });
    }
  };
}
