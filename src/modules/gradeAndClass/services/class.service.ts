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

    const newClass = await tenantPrisma.class.create({
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
      tenantPrisma.class.count({
        where: whereFilter,
      }),
      tenantPrisma.class.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
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
    const grade = await tenantPrisma.class.findUnique({
      where: {
        id: id,
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
    const classUpdated = await tenantPrisma.class.update({
      where: {
        id: id,
      },
      data: data,
    });

    return classUpdated;
  };

  static deleteById = async (tenantPrisma: PrismaClient, id: string) => {
    const classDeleted = await tenantPrisma.class.update({
      where: {
        id: id,
      },
      data: {
        archived: true,
      },
    });

    return classDeleted;
  };
}
