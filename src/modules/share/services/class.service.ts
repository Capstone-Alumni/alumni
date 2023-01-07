import { prisma } from '@lib/prisma/prisma';

import {
  CreateClassServiceProps,
  GetClassListServiceProps,
  UpdateGradeInfoByIdServiceProps,
} from '@share/types';

const isGradeExisted = async (id: string) => {
  const grade = await prisma.grade.findUnique({
    where: { id: id },
  });

  return grade;
};

export default class GradeService {
  static create = async ({ name, gradeId }: CreateClassServiceProps) => {
    if (!name) {
      throw new Error('invalid class name');
    }

    if (!isGradeExisted(gradeId)) {
      throw new Error('grade not exist');
    }

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
    if (!isGradeExisted(gradeId)) {
      throw new Error('grade not exist');
    }

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

  static updateInfoById = async (
    id: string,
    data: UpdateGradeInfoByIdServiceProps,
  ) => {
    const grade = await prisma.grade.update({
      where: {
        id: id,
      },
      data: data,
    });

    return grade;
  };

  static deleteById = async (id: string) => {
    const grade = await prisma.grade.delete({
      where: {
        id: id,
      },
    });

    return grade;
  };
}
