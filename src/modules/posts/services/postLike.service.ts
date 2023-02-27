import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

class PostLikeService {
  static like = async (
    tenantPrisma: PrismaClient,
    user: User,
    postId: string,
  ) => {
    const like = await tenantPrisma.postLike.upsert({
      where: {
        authorId_postId: {
          postId: postId,
          authorId: user.id,
        },
      },
      update: {},
      create: {
        post: {
          connect: {
            id: postId,
          },
        },
        authorInformation: {
          connect: {
            userId: user.id,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return like;
  };

  static unlike = async (
    tenantPrisma: PrismaClient,
    user: User,
    postId: string,
  ) => {
    const like = await tenantPrisma.postLike.delete({
      where: {
        authorId_postId: {
          postId: postId,
          authorId: user.id,
        },
      },
    });

    await tenantPrisma.$disconnect();

    return like;
  };
}

export default PostLikeService;
