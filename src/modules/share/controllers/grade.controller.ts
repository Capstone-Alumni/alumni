import { NextApiRequest, NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import GradeService from '../services/grade.service';

export default class GradeController {
  // static getPublicList = async (
  //   req: NextApiRequest,
  //   res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  // ) => {
  //   try {
  //     const schoolYearList = GradeService.getPublicList();
  //   } catch (error: any) {
  //     return res.status(500).json({
  //       status: false,
  //       message: error as string,
  //     });
  //   }
  // };

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
}
