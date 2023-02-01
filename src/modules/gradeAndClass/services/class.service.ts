import { prisma } from '@lib/prisma/prisma';

import {
  CreateClassServiceProps,
  GetClassListServiceProps,
  UpdateClassInfoByIdServiceProps,
} from '../types';

const isGradeExisted = async (id: string) => {
  if (!id) {
    throw new Error('grade not exist');
  }

  const grade = await prisma.grade.findUnique({
    where: { id: id },
  });

  if (!grade) {
    throw new Error('grade not exist');
  }
};

export default class GradeService {
  static create = async ({ name, gradeId }: CreateClassServiceProps) => {
    if (!name) {
      throw new Error('invalid class name');
    }
console.log("dad");
    await isGradeExisted(gradeId);

    const newClass = await prisma.class.create({
      data: {
        name: name,
        grade: {
          connect: {
            id: gradeId,
          },
        },
      },
    });

    return newClass;
  };

  static getList = async ({ params, gradeId }: GetClassListServiceProps) => {
    await isGradeExisted(gradeId);

    const { name, page, limit } = params;

    const whereFilter = {
      AND: [
        { gradeId: gradeId },
        { name: { contains: name } },
        { archived: false },
      ],
    };

    const [totalClassItem, classItems] = await prisma.$transaction([
      prisma.class.count({
        where: whereFilter,
      }),
      prisma.class.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
      }),
    ]);

    return {
      totalItems: totalClassItem,
      items: classItems,
      itemPerPage: limit,
    };
  };

  static getById = async (id: string) => {
    const grade = await prisma.class.findUnique({
      where: {
        id: id,
      },
    });

    return grade;
  };

  static updateInfoById = async (
    id: string,
    data: UpdateClassInfoByIdServiceProps,
  ) => {
    const classUpdated = await prisma.class.update({
      where: {
        id: id,
      },
      data: data,
    });

    return classUpdated;
  };

  static deleteById = async (id: string) => {
    const classDeleted = await prisma.class.update({
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
