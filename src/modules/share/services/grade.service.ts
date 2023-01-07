import { prisma } from '@lib/prisma/prisma';

import { CreateGradeServiceProps } from '@share/types';

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
}
