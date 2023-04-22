import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';

import MemberService from '../services/member.service';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiRequestWithTenant } from '@lib/next-connect';

export default class MemberController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const newMember = await MemberService.create(prisma, req.body);

      return res.status(201).json({
        status: true,
        data: newMember,
      });
    } catch (error) {
      if (error.message?.includes('invalid')) {
        return res.status(400).json({
          status: false,
          message: 'Invalid data',
        });
      }

      if (error.message?.includes('tenant')) {
        return res.status(400).json({
          status: false,
          message: 'Tenant is not exist',
        });
      }

      if (error.message?.includes('member already existed')) {
        return res.status(400).json({
          status: false,
          message: 'Member is already existed',
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
      const prisma = await getPrismaClient(req.tenantId);
      const { page, limit, name, excludeGradeId, excludeClassId } = req.query;
      const memberListData = await MemberService.getList(prisma, {
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20,
        name: name ? (name as string) : '',
        excludeGradeId: excludeGradeId as string,
        excludeClassId: excludeClassId as string,
      });

      return res.status(200).json({
        status: true,
        data: memberListData,
      });
    } catch (error) {
      if (error.message?.includes('tenant')) {
        return res.status(400).json({
          status: false,
          message: 'tenant is not exist',
        });
      }

      throw error;
    }
  };

  static updateInfoById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const { id } = req.query;
    const classUpdated = await MemberService.updateInfoById(
      id as string,
      req.body,
    );

    return res.status(200).json({
      status: true,
      data: classUpdated,
    });
  };

  static deleteAlumToClassById = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id: memberId, alumToClassId } = req.query;
    const ref = await MemberService.deleteAlumToClassById(prisma, {
      memberId: memberId as string,
      alumToClassId: alumToClassId as string,
    });

    return res.status(201).json({
      status: true,
      data: ref,
    });
  };

  static addAlumniToClass = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const { id: memberId } = req.query;
      const prisma = await getPrismaClient(req.tenantId);
      const { classId } = req.body;
      console.log(
        '🚀 ~ file: member.controller.ts:119 ~ MemberController ~ classId:',
        classId,
      );
      const alumniToClass = await MemberService.addAlumniToClass(prisma, {
        classId,
        memberId: memberId as string,
      });
      return res.status(200).json({
        status: true,
        data: alumniToClass,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
}
