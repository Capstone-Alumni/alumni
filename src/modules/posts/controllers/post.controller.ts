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
    const { page, limit, approved } = req.query;

    const listData = await PostService.createPost(prisma, req.user, req.body);

    return res.status(200).json({
      data: listData,
      status: true,
    });
  };
}

export default PostController;
