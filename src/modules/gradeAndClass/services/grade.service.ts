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
