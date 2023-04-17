import { Prisma, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
class PostService {
  static createPost = async (
    tenantPrisma: PrismaClient,
    user: User,
    {
      content,
      gradeId,
      alumClassId,
    }: {
      content: string;
      gradeId?: string;
      alumClassId?: string;
    },
  ) => {
    const payload: Prisma.PostCreateInput = {
      content,
      author: {
        connect: {
          id: user.id,
        },
      },
    };

    if (gradeId === 'all' && alumClassId === 'all') {
      payload.isPublicSchool = true;
    }
    if (alumClassId !== 'all') {
      payload.alumClass = {
        connect: { id: alumClassId },
      };
    }
    if (gradeId) {
      payload.grade = {
        connect: { id: gradeId },
      };
    }

    const post = await tenantPrisma.post.create({
      data: payload,
      include: {
        author: {
          include: {
            information: true,
          },
        },
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
      gradeId,
      alumClassId,
      page,
      limit,
    }: {
      gradeId: string;
      alumClassId: string;
      page: number;
      limit: number;
    },
  ) => {
    const userInformation = await tenantPrisma.alumni.findUnique({
      where: {
        id: user.id,
      },
      include: {
        alumniToClass: {
          include: {
            alumClass: true,
          },
        },
      },
    });
    const classIdList = userInformation?.alumniToClass.map(
      ({ alumClassId }) => alumClassId,
    );

    if (!userInformation) {
      throw new Error('user not exist');
    }

    const whereFilter: Prisma.PostWhereInput = {
      archived: false,
    };

    if (gradeId === 'all' && alumClassId === 'all') {
      whereFilter.isPublicSchool = true;
    } else if (alumClassId !== 'all') {
      whereFilter.alumClassId = alumClassId;
    } else if (gradeId !== 'all') {
      whereFilter.OR = [
        {
          gradeId: gradeId,
          alumClassId: null,
          author: {
            alumniToClass: {
              some: {
                alumClassId: {
                  in: classIdList,
                },
              },
            },
          },
        },
        {
          gradeId: gradeId,
          alumClassId: {
            in: classIdList,
          },
        },
      ];
    }

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
          author: {
            include: {
              information: true,
            },
          },
          postLikes: true,
          postComments: {
            include: {
              author: {
                include: {
                  information: true,
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

  static updatePost = async (
    tenantPrisma: PrismaClient,
    postId: string,
    { content }: { content?: string },
  ) => {
    const post = await tenantPrisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: content,
      },
    });

    await tenantPrisma.$disconnect();

    return post;
  };
}

export default PostService;
