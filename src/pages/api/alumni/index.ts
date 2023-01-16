import { getAlums } from 'src/lib/prisma/alumni';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import {
  ApiErrorResponse,
  ApiSuccessResponse,
} from 'src/pages/types/apiResponses';
import { nextAuthOptions } from '../auth/[...nextauth]';

const handler = async (
  request: NextApiRequest,
  response: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
) => {
  try {
    const session = await unstable_getServerSession(
      request,
      response,
      nextAuthOptions,
    );
    if (!session) {
      return response.status(401).json({
        status: 'ERROR',
        message: 'Unauthorized',
      });
    }
    const alums = (await getAlums()) as unknown[];
    return response.status(200).json({
      status: 'OK',
      data: {
        items: alums,
        totalItems: alums.length,
        itemPage: 1,
      },
    });
  } catch (error) {
    return response.status(500).json({
      status: 'ERROR',
      message: error as string,
    });
  }
};

export default handler;
