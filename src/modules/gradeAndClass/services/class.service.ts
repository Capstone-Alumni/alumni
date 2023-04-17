import { PrismaClient } from '@prisma/client';

import {
  CreateClassServiceProps,
  GetClassListServiceProps,
  UpdateClassInfoByIdServiceProps,
} from '../types';

export default class ClassService {
  static create = async (
    tenantPrisma: PrismaClient,
    { name, gradeId }: CreateClassServiceProps,
  ) => {
    if (!name) {
      throw new Error('invalid class name');
    }
    if (!gradeId) {
      throw new Error('invalid grade ID');
    }
    const grade = await tenantPrisma.grade.findUnique({
      where: { id: gradeId },
    });

    if (!grade) {
      throw new Error('grade not exist');
    }

    const newClass = await tenantPrisma.alumClass.create({
      data: {
        name: name,
        grade: {
          connect: {
            id: gradeId,
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return newClass;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    { params, gradeId }: GetClassListServiceProps,
  ) => {
    const { name, page, limit } = params;

    const whereFilter = {
      AND: [
        { gradeId: gradeId },
        { name: { contains: name } },
        { archived: false },
      ],
    };

    const [totalClassItem, classItems] = await tenantPrisma.$transaction([
      tenantPrisma.alumClass.count({
        where: whereFilter,
      }),
      tenantPrisma.alumClass.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          name: 'asc',
        },
        include: {
          _count: {
            select: {
              alumniToClass: {
                where: {
                  archived: false,
                },
              },
            },
          },
          alumniToClass: {
            where: {
              isClassMod: true,
            },
            include: {
              alumni: {
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
      totalItems: totalClassItem,
      items: classItems,
      itemPerPage: limit,
    };
  };

  static getById = async (tenantPrisma: PrismaClient, id: string) => {
    const grade = await tenantPrisma.alumClass.findUnique({
      where: {
        id: id,
      },
      include: {
        alumniToClass: {
          where: {
            isClassMod: true,
          },
          include: {
            alumni: {
              include: {
                information: true,
              },
            },
          },
        },
      },
    });

    await tenantPrisma.$disconnect();

    return grade;
  };

  static updateInfoById = async (
    tenantPrisma: PrismaClient,
    id: string,
    data: UpdateClassInfoByIdServiceProps,
  ) => {
    const classUpdated = await tenantPrisma.alumClass.update({
      where: {
        id: id,
      },
      data: data,
    });

    return classUpdated;
  };

  static deleteById = async (tenantPrisma: PrismaClient, id: string) => {
    const classDeleted = await tenantPrisma.alumClass.delete({
      where: {
        id: id,
      },
    });

    return classDeleted;
  };

  static addClassMod = async (
    tenantPrisma: PrismaClient,
    { classId, alumniId }: { classId: string; alumniId: string },
  ) => {
    const grade = await tenantPrisma.alumniToClass.upsert({
      where: {
        alumClassId_alumniId: {
          alumClassId: classId,
          alumniId: alumniId,
        },
      },
      create: {
        isClassMod: true,
        alumClass: {
          connect: {
            id: classId,
          },
        },
        alumni: {
          connect: {
            id: alumniId,
          },
        },
      },
      update: {
        isClassMod: true,
      },
    });

    return grade;
  };

  static removeClassMod = async (
    tenantPrisma: PrismaClient,
    { classId, alumniId }: { classId: string; alumniId: string },
  ) => {
    const grade = await tenantPrisma.alumniToClass.update({
      where: {
        alumClassId_alumniId: {
          alumClassId: classId,
          alumniId: alumniId,
        },
      },
      data: {
        isClassMod: false,
      },
    });

    return grade;
  };
}
