import { prisma } from '@lib/prisma/prisma';

import {
  CreateClassServiceProps,
  GetGradeListServiceProps,
  UpdateGradeInfoByIdServiceProps,
} from '@share/types';

export default class GradeService {
  static create = async ({ name, gradeId }: CreateClassServiceProps) => {
    if (!name) {
      throw new Error('invalid class name');
    }

    const grade = await prisma.grade.findUnique({
      where: { id: gradeId },
    });

    if (!grade) {
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

  static getPublicList = async ({ params }: GetGradeListServiceProps) => {
    const { name, code, page, limit } = params;

    const [totalGradeItem, gradeItems] = await prisma.$transaction([
      prisma.grade.count({
        where: {
          archived: false,
        },
      }),
      prisma.grade.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          AND: [
            {
              code: { contains: code },
            },
            {
              name: { contains: name },
            },
            {
              archived: false,
            },
          ],
        },
      }),
    ]);

    return {
      totalItems: totalGradeItem,
      items: gradeItems,
      itemPerPage: limit,
    };
  };

  static getById = async (id: string) => {
    const grade = await prisma.grade.findUnique({
      where: {
        id: id,
      },
    });

    return grade;
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
