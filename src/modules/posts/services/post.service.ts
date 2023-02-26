import { AccessLevel, Prisma, PrismaClient } from '@prisma/client';
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

    await tenantPrisma.$disconnect();

    return post;
  };

  static getPostList = async (
    tenantPrisma: PrismaClient,
    user: User,
    { page, limit }: { page: number; limit: number },
  ) => {
    const userInformation = await tenantPrisma.information.findUnique({
      where: {
        userId: user.id,
      },
      include: {
        alumClass: true,
      },
    });

    if (!userInformation) {
      throw new Error('user not exist');
    }

    const whereFilter: Prisma.PostWhereInput = {
      AND: [
        { archived: false },
        {
          OR: [
            { publicity: 'ALUMNI', authorId: user.id },
            {
              publicity: 'CLASS_MOD',
              authorInformation: { alumClassId: userInformation.alumClassId },
            },
            {
              publicity: 'GRADE_MOD',
              authorInformation: {
                alumClass: { gradeId: userInformation.alumClass?.gradeId },
              },
            },
            { publicity: 'SCHOOL_ADMIN' },
          ],
        },
      ],
    };

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.post.count({
        where: whereFilter,
      }),
      tenantPrisma.post.findMany({
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
          postLikes: true,
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
}

export default PostService;
