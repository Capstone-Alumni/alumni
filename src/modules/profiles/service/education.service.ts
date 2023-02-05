import { getPageAndLimitFromParams } from 'src/utils';
import { PrismaClient } from '@prisma/client';
import {
  CreateOrUpdateEducationServiceProps,
  QueryParamGetEducationByUserId,
} from '../types';

// const isUserExisted = async (id: string) => {
//   const whereFilter = {
//     AND: [{ id: id }, { archived: false }],
//   };

//   const user = await prisma.user.findFirst({
//     where: whereFilter,
//   });

//   if (!user) {
//     throw new Error('User is not existed');
//   }
// };

const isEducationExisted = async (tenantPrisma: PrismaClient, id: string) => {
  const whereFilter = {
    AND: [{ id: id }, { archived: false }],
  };
  const education = await tenantPrisma.education.findFirst({
    where: whereFilter,
  });
  if (!education) {
    throw new Error('Education information is not existed');
  }
};

export default class EducationServices {
  static createEducation = async (
    tenantPrisma: PrismaClient,
    userId: string,
    body: CreateOrUpdateEducationServiceProps,
  ) => {
    // await isUserExisted(userId);
    const newEducation = await tenantPrisma.education.create({
      data: {
        ...body,
        userId: userId,
      },
    });
    return newEducation;
  };

  static bulkCreate = async (
    tenantPrisma: PrismaClient,
    userId: string,
    educations: CreateOrUpdateEducationServiceProps[],
  ) => {
    // await isUserExisted(userId);

    await tenantPrisma.education.deleteMany({
      where: {
        userId,
      },
    });

    const newEducations = await tenantPrisma.education.createMany({
      data: educations
        ? educations.map(education => ({
            degree: education.degree,
            school: education.school,
            startDate: education.startDate,
            endDate: education.endDate,
            userId,
          }))
        : [],
    });
    return newEducations;
  };

  static updateEducation = async (
    tenantPrisma: PrismaClient,
    userId: string,
    educationId: string,
    body: CreateOrUpdateEducationServiceProps,
  ) => {
  //  await isUserExisted(userId);
    await isEducationExisted(tenantPrisma,educationId);

    const educationUpdated = await tenantPrisma.education.update({
      where: { id: educationId },
      data: body,
    });

    return educationUpdated;
  };

  static getEducationByEduId = async (tenantPrisma:PrismaClient, userId: string, educationId: string) => {
    //await isUserExisted(userId);

    const whereFilter = {
      AND: [{ id: educationId }, { archived: false }],
    };
    const education = await tenantPrisma.education.findFirst({
      where: whereFilter,
    });

    return education;
  };

  static deleteEducationByEduId = async (
    tenantPrisma: PrismaClient,
    userId: string,
    educationId: string,
  ) => {
   // await isUserExisted(userId);
    await isEducationExisted(tenantPrisma,educationId);

    const education = await tenantPrisma.education.update({
      where: { id: educationId },
      data: {
        archived: true,
      },
    });

    return education;
  };

  static getEducationsByUserId = async (
    tenantPrisma: PrismaClient,
    userId: string,
    params: QueryParamGetEducationByUserId,
  ) => {
    //await isUserExisted(userId);

    const { page, limit } = getPageAndLimitFromParams(params);
    const { school, degree, startDate, endDate } = params;
    const whereFilter = {
      AND: [
        { userId: userId },
        { school: { contains: school } },
        { degree: degree },
        { startDate: { gte: startDate } },
        { endDate: { lte: endDate } },
        { archived: false },
      ],
    };
    const [totalEducationItem, educationItems] = await tenantPrisma.$transaction([
      tenantPrisma.education.count({
        where: whereFilter,
      }),
      tenantPrisma.education.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
      }),
    ]);
    return {
      totalItems: totalEducationItem,
      items: educationItems,
      itemPerPage: limit,
    };
  };
}
