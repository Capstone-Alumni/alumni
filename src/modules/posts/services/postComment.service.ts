import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

class PostCommentService {
  static createComment = async (
    tenantPrisma: PrismaClient,
    user: User,
    { postId, content }: { postId: string; content: string },
  ) => {
    const comment = await tenantPrisma.postComment.create({
      data: {
        content,
        authorInformation: {
          connect: {
            userId: user.id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
      include: {
        authorInformation: true,
      },
    });

    await tenantPrisma.$disconnect();

    return comment;
  };

  static getCommentList = async (
    tenantPrisma: PrismaClient,
    { postId, page, limit }: { postId: string; page: number; limit: number },
  ) => {
    const whereFilter = {
      postId: postId,
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.postComment.count({
        where: whereFilter,
      }),
      tenantPrisma.postComment.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          authorInformation: {
            include: {
              alumClass: {
                include: {
                  grade: true,
                },
              },
            },
          },
        },
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalItems,
      items,
      itemPerPage: limit,
    };
  };

  static updateComment = async (
    tenantPrisma: PrismaClient,
    user: User,
    { commentId, content }: { commentId: string; content: string },
  ) => {
    const comment = await tenantPrisma.postComment.update({
      where: {
        id: commentId,
      },
      data: {
        content: content,
      },
    });

    await tenantPrisma.$disconnect();

    return comment;
  };

  static deleteComment = async (
    tenantPrisma: PrismaClient,
    user: User,
    { commentId }: { commentId: string },
  ) => {
    const comment = await tenantPrisma.postComment.delete({
      where: {
        id: commentId,
      },
    });

    await tenantPrisma.$disconnect();

    return comment;
  };
}

export default PostCommentService;
