import { PrismaClient } from '@prisma/client';
import {
  CreateGradeServiceProps,
  GetGradeListServiceProps,
  UpdateGradeInfoByIdServiceProps,
} from '../types';

export default class GradeService {
  static create = async (
    tenantPrisma: PrismaClient,
    { code }: CreateGradeServiceProps,
  ) => {
    const existingGrade = await tenantPrisma.grade.findUnique({
      where: {
        code: code,
      },
    });

    if (existingGrade) {
      throw new Error('existed');
    }

    const newGrade = await tenantPrisma.grade.create({
      data: {
        code: code,
      },
    });

    return newGrade;
  };

  static createMany = async (
    tenantPrisma: PrismaClient,
    { data }: { data: Array<{ gradeCode: string; className: string }> },
  ) => {
    const gradeCodeList = data.map(({ gradeCode }) => gradeCode);

    await tenantPrisma.grade.createMany({
      data: data.map(row => ({ code: row.gradeCode })),
      skipDuplicates: true,
    });

    const gradeListData = await tenantPrisma.grade.findMany({
      where: {
        code: {
          in: gradeCodeList,
        },
      },
    });

    const classData = data.map(({ gradeCode, className }) => {
      const grade = gradeListData.find(d => d.code === gradeCode);
      if (!grade) {
        throw new Error('grade not exist');
      }
      return {
        name: className,
        gradeId: grade?.id,
      };
    });

    const count = await tenantPrisma.alumClass.createMany({
      data: classData,
      skipDuplicates: true,
    });

    return count;
  };

  static getPublicList = async (
    tenantPrisma: PrismaClient,
    { params }: GetGradeListServiceProps,
  ) => {
    const { code, page, limit } = params;

    const whereFilter = {
      AND: [{ OR: [{ code: { contains: code } }] }, { archived: false }],
    };

    const [totalGradeItem, gradeItems] = await tenantPrisma.$transaction([
      tenantPrisma.grade.count({
        where: whereFilter,
      }),
      tenantPrisma.grade.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    await tenantPrisma.$disconnect();

    return {
      totalItems: totalGradeItem,
      items: gradeItems,
      itemPerPage: limit,
    };
  };

  static getById = async (tenanttPrisma: PrismaClient, id: string) => {
    const grade = await tenanttPrisma.grade.findUnique({
      where: {
        id: id,
      },
    });

    return grade;
  };

  static updateInfoById = async (
    tenanttPrisma: PrismaClient,
    id: string,
    data: UpdateGradeInfoByIdServiceProps,
  ) => {
    const grade = await tenanttPrisma.grade.update({
      where: {
        id: id,
      },
      data: data,
    });

    return grade;
  };

  static deleteById = async (tenanttPrisma: PrismaClient, id: string) => {
    const grade = await tenanttPrisma.grade.update({
      where: {
        id: id,
      },
      data: {
        archived: true,
      },
    });

    return grade;
  };
}
