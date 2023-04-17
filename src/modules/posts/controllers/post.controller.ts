import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import PostService from '../services/post.service';

class PostController {
  static createPost = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);

    const listData = await PostService.createPost(prisma, req.user, req.body);

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };

  static getPostList = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { page, limit, all, alumClassId, gradeId } = req.query;

    const listData = await PostService.getPostList(prisma, req.user, {
      all: !!all,
      gradeId: gradeId as string,
      alumClassId: alumClassId as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 1,
    });

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };

  static deletePost = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await PostService.deletePost(prisma, req.user, id as string);

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static updatePost = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await PostService.updatePost(prisma, id as string, req.body);

    return res.status(200).json({
      data: data,
      status: true,
    });
  };
}

export default PostController;
