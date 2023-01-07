import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import ClassService from '../services/class.service';

export default class ClassController {
  static create = async (
    req: NextApiRequest,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      console.log(req.query);
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
}
