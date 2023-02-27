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
      include: {
        authorInformation: true,
        postLikes: true,
        postComments: true,
      },
    });

    await tenantPrisma.$disconnect();

    return post;
  };

  static getPostList = async (
    tenantPrisma: PrismaClient,
    user: User,
    {
      all,
      myGrade,
      myClass,
      page,
      limit,
    }: {
      all: boolean;
      myClass: boolean;
      myGrade: boolean;
      page: number;
      limit: number;
    },
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
        myClass
          ? {
              authorInformation: {
                alumClassId: userInformation.alumClassId,
              },
            }
          : { archived: false },
        myGrade
          ? {
              authorInformation: {
                alumClass: {
                  gradeId: userInformation.alumClass?.gradeId,
                },
              },
            }
          : { archived: false },
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
          postComments: {
            include: {
              authorInformation: true,
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

  static deletePost = async (
    tenantPrisma: PrismaClient,
    user: User,
    postId: string,
  ) => {
    const post = await tenantPrisma.post.update({
      where: {
        id: postId,
      },
      data: {
        archived: true,
      },
    });

    await tenantPrisma.$disconnect();

    return post;
  };
}

export default PostService;
