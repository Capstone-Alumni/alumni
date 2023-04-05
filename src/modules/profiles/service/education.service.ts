import { getPageAndLimitFromParams } from 'src/utils';
import { PrismaClient } from '@prisma/client';
import {
  CreateOrUpdateEducationServiceProps,
  InformationIncludeClass,
  QueryParamGetEducationByUserId,
} from '../types';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';
import { User } from 'next-auth';

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

const canViewEducation = (
  information: InformationIncludeClass | null,
  requesterInformation: InformationIncludeClass | null,
) => {
  if (information?.userId === requesterInformation?.userId) {
    return true;
  }
  if (
    !canViewInformationDetail(
      information?.educationPublicity || 'PRIVATE',
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    return false;
  }
  return true;
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
    await isEducationExisted(tenantPrisma, educationId);

    const educationUpdated = await tenantPrisma.education.update({
      where: { id: educationId },
      data: body,
    });

    return educationUpdated;
  };

  static getEducationByEduId = async (
    tenantPrisma: PrismaClient,
    userId: string,
    educationId: string,
  ) => {
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
    await isEducationExisted(tenantPrisma, educationId);

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
    user: User,
    params: QueryParamGetEducationByUserId,
  ) => {
    //await isUserExisted(userId);

    const requesterInformation = await tenantPrisma.information.findUnique({
      where: { userId: user.id },
      include: {
        alumClass: {
          include: {
            grade: true,
          },
        },
      },
    });

    const userInformation = await tenantPrisma.information.findUnique({
      where: { userId: userId },
      include: {
        alumClass: {
          include: {
            grade: true,
          },
        },
      },
    });

    if (!canViewEducation(userInformation, requesterInformation)) {
      return {
        totalItems: 0,
        items: {},
        itemPerPage: 0,
      };
    }
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
    const [totalEducationItem, educationItems] =
      await tenantPrisma.$transaction([
        tenantPrisma.education.count({
          where: whereFilter,
        }),
        tenantPrisma.education.findMany({
          skip: (page - 1) * limit,
          take: limit,
          where: whereFilter,
          orderBy: {
            startDate: 'desc',
          },
        }),
      ]);
    return {
      totalItems: totalEducationItem,
      items: educationItems,
      itemPerPage: limit,
    };
  };
}
