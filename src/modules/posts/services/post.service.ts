import { AccessLevel, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

class PostService {
  static createPost = async (
    tenantPrisma: PrismaClient,
    user: User,
    { content, publicity }: { content: string; publicity: AccessLevel },
  ) => {
    const post = await tenantPrisma.post.create({
      data: {
        content,
        publicity,
        authorInformation: {
          connect: {
            userId: user.id,
          },
        },
      },
    });

    return post;
  };
}

export default PostService;
