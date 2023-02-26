import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import PostCommentService from '../services/postComment.service';

class PostCommentController {
  static createComment = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await PostCommentService.createComment(prisma, req.user, {
      postId: id,
      ...req.body,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static getCommentList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit } = req.query;
    const { id } = req.query;

    const listData = await PostCommentService.getCommentList(prisma, {
      postId: id as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 1,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };

  static updateComment = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { cid } = req.query;

    const data = await PostCommentService.updateComment(prisma, req.user, {
      commentId: cid,
      ...req.body,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static deleteComment = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { cid } = req.query;

    const data = await PostCommentService.deleteComment(prisma, req.user, {
      commentId: cid as string,
    });

    return res.status(200).json({
      data: data,
      status: true,
    });
  };
}

export default PostCommentController;
