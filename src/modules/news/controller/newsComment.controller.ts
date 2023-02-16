import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import NewsCommentService from '../services/newsComment.service';

export default class NewsCommentController {
  static create = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: newsId } = req.query;
      const userId = req.user.id;
      const newsCreated = await NewsCommentService.create(
        prisma,
        newsId as string,
        userId as string,
        req.body,
      );
      return res.status(201).json({
        status: true,
        data: newsCreated,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static getList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { id: newsId } = req.query;
      const newsComments = await NewsCommentService.getList(
        prisma,
        newsId as string,
        req.query,
      );
      return res.status(200).json({
        status: true,
        data: newsComments,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static updateComment = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const prisma = await getPrismaClient(req.tenantId);
      const { commentId } = req.query;
      const userId = req.user.id;

      const newsCommentUpdated = await NewsCommentService.update(
        prisma,
        commentId as string,
        userId,
        req.body,
      );
      return res.status(200).json({
        status: true,
        data: newsCommentUpdated,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };

  static deleteComment = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    try {
      const session = await unstable_getServerSession(
        req,
        res,
        nextAuthOptions,
      );

      const isSchoolAdmin = session?.user.accessLevel === 'SCHOOL_ADMIN';

      const prisma = await getPrismaClient(req.tenantId);
      const { commentId } = req.query;
      const userId = req.user.id;
      const newsCommentDeleted = await NewsCommentService.delete(
        prisma,
        commentId as string,
        userId,
        isSchoolAdmin,
      );
      return res.status(200).json({
        status: true,
        data: newsCommentDeleted,
      });
    } catch (error: any) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  };
}
