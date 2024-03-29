import {
  CreateManyMemberServiceProps,
  CreateMemberServiceProps,
  GetMemberListServiceProps,
  UpdateMemberInfoByIdServiceProps,
} from '../types';
import { Prisma, PrismaClient } from '@prisma/client';

export default class MemberService {
  static create = async (
    tenantPrisma: PrismaClient,
    {
      tenantId,
      gradeClass,
      alumniId,
      facebook,
      dateOfBirth,
      email,
      ...memberData
    }: CreateMemberServiceProps,
  ) => {
    const alumClassId = gradeClass?.[0].alumClass?.id;

    if (!memberData.fullName || gradeClass?.length === 0) {
      throw new Error('invalid data');
    }

    const member = await tenantPrisma.alumni.create({
      data: {
        id: alumniId,
        tenantId: tenantId,
      },
    });

    await tenantPrisma.alumniToClass.createMany({
      data: [{ alumClassId: alumClassId, alumniId: member.id }],
    });

    await tenantPrisma.information.create({
      data: {
        ...memberData,
        email: email && email.length ? email : null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        alumniId: member.id,
        facebookUrl: facebook,
      },
    });

    return member;
  };

  static createMany = async (
    tenantPrisma: PrismaClient,
    data: CreateManyMemberServiceProps,
  ) => {
    const alumniList = data.map(d => ({
      id: d.alumniId,
      tenantId: d.tenantId,
    }));

    const alumToClassList = data
      .map(d =>
        d.gradeClass.reduce((red: any[], { alumClass }) => {
          return red.concat(
            alumClass.map(cl => ({
              alumClassId: cl.value,
              alumniId: d.alumniId,
            })),
          );
        }, []),
      )
      .flat();

    const informationList = data.map(
      ({
        alumniId,
        facebook,
        email,
        dateOfBirth,
        gradeClass,
        tenantId,
        ...other
      }) => ({
        ...other,
        email: email?.length ? email : null,
        alumniId: alumniId,
        facebookUrl: facebook,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      }),
    );

    const [member] = await tenantPrisma.$transaction([
      tenantPrisma.alumni.createMany({
        data: alumniList,
        skipDuplicates: true,
      }),
      tenantPrisma.alumniToClass.createMany({
        data: alumToClassList,
        skipDuplicates: true,
      }),
      tenantPrisma.information.createMany({
        data: informationList,
        skipDuplicates: true,
      }),
    ]);

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
          { email: { contains: name } },
          { fullName: { contains: name } },
          // { OR: [{ email: null }, { email: { contains: name } }] },
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

  static addAlumniToClass = async (
    tenantPrisma: PrismaClient,
    { classId, memberId }: { classId: string; memberId: string },
  ) => {
    const alumniToClass = await tenantPrisma.alumniToClass.create({
      data: {
        alumni: {
          connect: {
            id: memberId,
          },
        },
        alumClass: {
          connect: {
            id: classId,
          },
        },
      },
    });
    await tenantPrisma.$disconnect();

    if (alumniToClass) {
      return alumniToClass;
    }
    throw new Error('error when add class');
  };
}
