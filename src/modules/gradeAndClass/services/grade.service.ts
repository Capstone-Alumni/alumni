import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateGradeServiceProps,
  GetGradeListServiceProps,
  UpdateGradeInfoByIdServiceProps,
} from '../types';

export default class GradeService {
  static create = async (
    tenantPrisma: PrismaClient,
    { code, startYear, endYear }: CreateGradeServiceProps,
  ) => {
    const newGrade = await tenantPrisma.grade.upsert({
      where: {
        startYear_endYear: {
          startYear: parseInt(startYear, 10),
          endYear: parseInt(endYear, 10),
        },
      },
      create: {
        code: code,
        startYear: parseInt(startYear, 10),
        endYear: parseInt(endYear, 10),
      },
      update: {
        code: code,
        archived: false,
      },
    });

    await tenantPrisma.$disconnect();

    return newGrade;
  };

  static clone = async (tenantPrisma: PrismaClient, id: string) => {
    const grade = await tenantPrisma.grade.findUnique({
      where: {
        id: id,
      },
      include: {
        alumClasses: true,
      },
    });

    if (!grade || grade?.archived === true) {
      throw new Error('not exist');
    }

    const newGrade = await tenantPrisma.grade.upsert({
      where: {
        startYear_endYear: {
          startYear: grade?.startYear + 1,
          endYear: grade?.endYear + 1,
        },
      },
      create: {
        startYear: grade?.startYear + 1,
        endYear: grade?.endYear + 1,
      },
      update: {
        archived: false,
      },
    });

    await tenantPrisma.alumClass.createMany({
      data: grade.alumClasses.map(c => ({
        name: c.name,
        gradeId: newGrade.id,
      })),
      skipDuplicates: true,
    });

    await tenantPrisma.$disconnect();

    return newGrade;
  };

  static createMany = async (
    tenantPrisma: PrismaClient,
    {
      data,
    }: {
      data: Array<{
        startYear: string;
        endYear: string;
        code?: string;
        classNameList: string[];
      }>;
    },
  ) => {
    const gradeStartYearList = data.map(({ startYear }) =>
      parseInt(startYear, 10),
    );

    await tenantPrisma.grade.createMany({
      data: data.map(row => ({
        code: row.code,
        startYear: parseInt(row.startYear),
        endYear: parseInt(row.endYear),
      })),
      skipDuplicates: true,
    });

    const gradeListData = await tenantPrisma.grade.findMany({
      where: {
        startYear: {
          in: gradeStartYearList,
        },
      },
    });

    const classData = data.reduce(
      (red: any[], { startYear, endYear, classNameList }) => {
        const grade = gradeListData.find(
          d =>
            d.startYear === parseInt(startYear, 10) &&
            d.endYear === parseInt(endYear, 10),
        );
        if (!grade) {
          throw new Error('grade not exist');
        }
        return red.concat(
          classNameList.map(name => ({ name: name, gradeId: grade.id })),
        );
      },
      [],
    );

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
    const { code, page, limit, alumniId } = params;

    const whereFilter: Prisma.GradeWhereInput = {
      archived: false,
    };

    if (parseInt(code, 10)) {
      whereFilter.OR = [
        { code: { contains: code } },
        {
          startYear: parseInt(code, 10),
        },
        {
          endYear: parseInt(code, 10),
        },
      ];
    } else {
      whereFilter.OR = [{ code: { contains: code } }, { archived: false }];
    }

    const alumClassesWhereInclude: Prisma.AlumClassWhereInput = {
      archived: false,
    };

    if (alumniId) {
      const alumni = await tenantPrisma.alumni.findUnique({
        where: { id: alumniId },
        include: {
          gradeMod: true,
          alumniToClass: {
            where: { isClassMod: true },
            include: { alumClass: true },
          },
        },
      });
      if (alumni && !alumni.isOwner) {
        whereFilter.id = {
          in: alumni.gradeMod
            .map(({ gradeId }) => gradeId)
            .concat(
              alumni.alumniToClass.map(alToCl => alToCl.alumClass.gradeId),
            ),
        };
        alumClassesWhereInclude.OR = [
          {
            gradeId: {
              in: alumni.gradeMod.map(({ gradeId }) => gradeId),
            },
          },
          {
            id: {
              in: alumni.alumniToClass.map(alToCl => alToCl.alumClassId),
            },
          },
        ];
      }
    }

    const [totalGradeItem, gradeItems] = await tenantPrisma.$transaction([
      tenantPrisma.grade.count({
        where: whereFilter,
      }),
      tenantPrisma.grade.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          _count: {
            select: {
              alumClasses: {
                where: alumClassesWhereInclude,
              },
            },
          },
          alumClasses: {
            where: alumClassesWhereInclude,
          },
          gradeMod: {
            include: {
              alumni: {
                include: {
                  information: true,
                },
              },
            },
          },
        },
        orderBy: {
          endYear: 'desc',
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
      include: {
        gradeMod: {
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

    return grade;
  };

  static updateInfoById = async (
    tenanttPrisma: PrismaClient,
    id: string,
    { code, startYear, endYear }: UpdateGradeInfoByIdServiceProps,
  ) => {
    let dataUpdate = {};
    if (code) {
      dataUpdate = { ...dataUpdate, code };
    }
    if (startYear) {
      dataUpdate = { ...dataUpdate, startYear: parseInt(startYear, 10) };
    }
    if (endYear) {
      dataUpdate = { ...dataUpdate, endYear: parseInt(endYear, 10) };
    }

    const grade = await tenanttPrisma.grade.update({
      where: {
        id: id,
      },
      data: dataUpdate,
    });

    return grade;
  };

  static deleteById = async (tenanttPrisma: PrismaClient, id: string) => {
    const grade = await tenanttPrisma.grade.delete({
      where: {
        id: id,
      },
    });

    return grade;
  };

  static addGradeMod = async (
    tenantPrisma: PrismaClient,
    { gradeId, alumniId }: { gradeId: string; alumniId: string },
  ) => {
    const grade = await tenantPrisma.gradeMod.upsert({
      where: {
        gradeId_alumniId: {
          gradeId,
          alumniId,
        },
      },
      create: {
        grade: {
          connect: {
            id: gradeId,
          },
        },
        alumni: {
          connect: {
            id: alumniId,
          },
        },
      },
      update: {},
    });

    return grade;
  };

  static removeGradeMod = async (
    tenantPrisma: PrismaClient,
    { gradeId, alumniId }: { gradeId: string; alumniId: string },
  ) => {
    const grade = await tenantPrisma.gradeMod.delete({
      where: {
        gradeId_alumniId: {
          gradeId,
          alumniId,
        },
      },
    });

    return grade;
  };
}
