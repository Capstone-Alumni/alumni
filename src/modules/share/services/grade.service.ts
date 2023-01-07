import { prisma } from '@lib/prisma/prisma';

import {
  CreateGradeServiceProps,
  GetGradeListServiceProps,
} from '@share/types';

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
    console.log(newGrade);
    return newGrade;
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
}
