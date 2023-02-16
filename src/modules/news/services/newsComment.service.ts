import { PrismaClient } from '@prisma/client';
import { getPageAndLimitFromParams } from 'src/utils';

export default class NewsCommentService {
  static create = async (
    tenantPrisma: PrismaClient,
    newsId: string,
    userId: string,
    body: any,
  ) => {
    const information = await tenantPrisma.information.findFirst({
      where: { userId: userId },
    });
    const newsCommetCreated = await tenantPrisma.newsComment.create({
      data: {
        ...body,
        commenterId: userId,
        news: {
          connect: { id: newsId },
        },
        commenterInfo: {
          connect: { id: information!.id },
        },
      },
    });
    return newsCommetCreated;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    newsId: string,
    params: any,
  ) => {
    const { page, limit } = getPageAndLimitFromParams(params);
    const whereFilter = {
      AND: [{ newsId: newsId }, { archived: false }],
    };
    const [totalNewsComments, newsComments] = await tenantPrisma.$transaction([
      tenantPrisma.newsComment.count({
        where: whereFilter,
      }),
      tenantPrisma.newsComment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          commenterInfo: {
            select: {
              id: true,
              fullName: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      }),
    ]);
    return {
      totalItems: totalNewsComments,
      items: newsComments,
      itemPerPage: limit,
    };
  };

  static update = async (
    tenantPrisma: PrismaClient,
    commentId: string,
    userId: string,
    body: any,
  ) => {
    const newsComment = await tenantPrisma.newsComment.findFirst({
      where: { id: commentId, archived: false },
    });

    if (!newsComment) {
      throw new Error('Comment is not existed');
    } else if (newsComment && newsComment.commenterId !== userId) {
      throw new Error('Not allowed to update this comment');
    }

    const newsCommetUpdated = await tenantPrisma.newsComment.update({
      where: { id: commentId },
      data: {
        ...body,
      },
    });
    return newsCommetUpdated;
  };

  static delete = async (
    tenantPrisma: PrismaClient,
    commentId: string,
    userId: string,
    isSchoolAdmin: boolean,
  ) => {
    const newsComment = await tenantPrisma.newsComment.findFirst({
      where: { id: commentId, archived: false },
    });

    if (!newsComment) {
      throw new Error('Comment is not existed');
    } else if (!isSchoolAdmin) {
      if (newsComment && newsComment.commenterId !== userId) {
        throw new Error('Not allowed to delete this comment');
      }
    }
    const newsCommetDeleted = await tenantPrisma.newsComment.update({
      where: { id: commentId },
      data: {
        archived: true,
      },
    });
    return newsCommetDeleted;
  };
}
