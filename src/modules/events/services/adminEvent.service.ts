import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';

export const getSameClassFilter = (classId: string) => ({
  hostInformation: {
    alumClassId: classId,
  },
});

export const getSameGradeFilter = (gradeId: string) => ({
  hostInformation: {
    alumClass: {
      gradeId: gradeId,
    },
  },
});

export const buildEventWhereFilter = async (
  tenantPrisma: PrismaClient,
  user: User,
) => {
  const alumni = await tenantPrisma.alumni.findUnique({
    where: {
      id: user.id,
    },
    include: {
      alumniToClass: {
        include: {
          alumClass: true,
        },
      },
      gradeMod: true,
    },
  });

  if (!alumni) {
    throw new Error('user not exist');
  }

  if (alumni.isOwner) {
    return {};
  }

  return {
    OR: [
      {
        isPublicSchool: true,
      },
      {
        gradeId: {
          in: alumni.gradeMod.map(gr => gr.gradeId),
        },
      },
    ],
  };
};

export default class AdminEventService {
  static getList = async (
    tenantPrisma: PrismaClient,
    {
      user,
      page,
      limit,
      title,
    }: {
      user: User;
      page: number;
      limit: number;
      title: string;
    },
  ) => {
    const whereFilter = await buildEventWhereFilter(tenantPrisma, user);

    const [totalItems, items] = await tenantPrisma.$transaction([
      tenantPrisma.event.count({
        where: {
          ...whereFilter,
          archived: false,
          title: {
            contains: title,
          },
        },
      }),
      tenantPrisma.event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ...whereFilter,
          archived: false,
          title: {
            contains: title,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          host: {
            include: {
              information: true,
            },
          },
          grade: true,
          eventParticipants: true,
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

  static getById = async (
    tenantPrisma: PrismaClient,
    { user, eventId }: { user: User; eventId: string },
  ) => {
    const whereFilter = await buildEventWhereFilter(tenantPrisma, user);

    const event = await tenantPrisma.event.findUnique({
      where: {
        ...whereFilter,
        id: eventId,
      },
    });

    return event;
  };
}
