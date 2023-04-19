import {
  CreateMemberServiceProps,
  GetMemberListServiceProps,
  UpdateMemberInfoByIdServiceProps,
} from '../types';
import { Prisma, PrismaClient } from '@prisma/client';

export default class MemberService {
  static create = async (
    tenantPrisma: PrismaClient,
    { tenantId, gradeClass, ...memberData }: CreateMemberServiceProps,
  ) => {
    const flattenClass = gradeClass.reduce((red: any[], { alumClass }) => {
      return red.concat(alumClass.map(cl => cl.value));
    }, []);

    if (!memberData.fullName || gradeClass?.length === 0) {
      throw new Error('invalid data');
    }

    const member = await tenantPrisma.alumni.create({
      data: {
        tenantId: tenantId,
      },
    });

    await tenantPrisma.alumniToClass.createMany({
      data: flattenClass.map(c => ({ alumClassId: c, alumniId: member.id })),
    });

    await tenantPrisma.information.create({
      data: {
        ...memberData,
        alumniId: member.id,
      },
    });

    return member;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    params: GetMemberListServiceProps,
  ) => {
    const { name, page, limit, excludeGradeId, excludeClassId } = params;

    const whereFilter: Prisma.AlumniWhereInput = {
      information: {
        OR: [
          { fullName: { contains: name } },
          { OR: [{ email: null }, { email: { contains: name } }] },
        ],
      },
      archived: false,
    };

    if (excludeGradeId) {
      whereFilter.gradeMod = {
        every: {
          gradeId: {
            not: excludeGradeId,
          },
        },
      };
    }

    if (excludeClassId) {
      whereFilter.alumniToClass = {
        every: {
          NOT: {
            alumClassId: excludeClassId,
            isClassMod: true,
          },
        },
      };
    }

    const [totalMemberItem, MemberItems] = await tenantPrisma.$transaction([
      tenantPrisma.alumni.count({
        where: whereFilter,
      }),
      tenantPrisma.alumni.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          information: true,
          alumniToClass: {
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

    return {
      totalItems: totalMemberItem,
      items: MemberItems,
      itemPerPage: limit,
    };
  };

  static updateInfoById = async (
    id: string,
    data: UpdateMemberInfoByIdServiceProps,
  ) => {
    const member = await prisma.alumni.findUnique({
      where: {
        id: id,
      },
    });

    return member;
  };

  static deleteAlumToClassById = async (
    tenantPrisma: PrismaClient,
    { alumToClassId }: { memberId: string; alumToClassId: string },
  ) => {
    const member = await tenantPrisma.alumniToClass.delete({
      where: {
        id: alumToClassId,
      },
    });

    return member;
  };
}
