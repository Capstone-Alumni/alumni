import { NextApiRequestWithTenant } from '@lib/next-connect';
import getPrismaClient from '@lib/prisma/prisma';
import { NextApiResponse } from 'next';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/types';
import PostLikeService from '../services/postLike.service';

class PostLikeController {
  static like = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await PostLikeService.like(prisma, req.user, id as string);

    return res.status(200).json({
      data: data,
      status: true,
    });
  };

  static unlike = async (
    req: NextApiRequestWithTenant,
    res: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
  ) => {
    const prisma = await getPrismaClient(req.tenantId);
    const { id } = req.query;

    const data = await PostLikeService.unlike(prisma, req.user, id as string);

    return res.status(200).json({
      data: data,
      status: true,
    });
  };
}

export default PostLikeController;
