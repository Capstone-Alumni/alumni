import { prisma } from '@lib/prisma/prisma';

import {
  CreateGradeServiceProps,
  GetGradeListServiceProps,
  UpdateGradeInfoByIdServiceProps,
} from '../types';

export default class GradeService {
  static create = async ({ name, code }: CreateGradeServiceProps) => {
    const existingGrade = await prisma.grade.findUnique({
      where: {
        code: code,
      },
    });

    if (existingGrade) {
      throw new Error('existed');
    }

    const newGrade = await prisma.grade.create({
      data: {
        name: name,
        code: code,
      },
    });

    return newGrade;
  };

  static getPublicList = async ({ params }: GetGradeListServiceProps) => {
    const { name, code, page, limit } = params;

    const whereFilter = {
      AND: [
        { code: { contains: code } },
        { name: { contains: name } },
        { archived: false },
      ],
    };

    const [totalGradeItem, gradeItems] = await prisma.$transaction([
      prisma.grade.count({
        where: whereFilter,
      }),
      prisma.grade.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
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
