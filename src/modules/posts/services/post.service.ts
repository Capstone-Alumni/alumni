import { AccessLevel, Prisma, PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
class PostService {
  static createPost = async (
    tenantPrisma: PrismaClient,
    user: User,
    {
      content,
      isPublicSchool,
      gradeId,
      alumClassId,
    }: {
      content: string;
      isPublicSchool: boolean;
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

    if (isPublicSchool) {
      payload.isPublicSchool = true;
    }
    if (gradeId) {
      payload.grade = {
        connect: { id: gradeId },
      };
    }
    if (alumClassId) {
      payload.alumClass = {
        connect: { id: alumClassId },
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
      all,
      gradeId,
      alumClassId,
      page,
      limit,
    }: {
      all: boolean;
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
    const gradeIdList = userInformation?.alumniToClass.map(
      ({ alumClass }) => alumClass.gradeId,
    );

    if (!userInformation) {
      throw new Error('user not exist');
    }

    const whereFilter: Prisma.PostWhereInput = {
      archived: false,
    };

    if (all) {
      whereFilter.isPublicSchool = true;
    }
    if (gradeId && gradeIdList?.find(id => id === gradeId)) {
      whereFilter.gradeId = gradeId;
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
    data: { content?: string; publicity?: AccessLevel },
  ) => {
    const post = await tenantPrisma.post.update({
      where: {
        id: postId,
      },
      data: data,
    });

    await tenantPrisma.$disconnect();

    return post;
  };
}

export default PostService;
