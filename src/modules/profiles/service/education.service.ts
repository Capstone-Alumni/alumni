import { prisma } from '@lib/prisma/prisma';
import { getPageAndLimitFromParams } from 'src/utils';
import {
  CreateOrUpdateEducationServiceProps,
  QueryParamGetEducationByUserId,
} from '../types';

const isUserExisted = async (id: string) => {
  const whereFilter = {
    AND: [{ id: id }, { archived: false }],
  };

  const user = await prisma.user.findFirst({
    where: whereFilter,
  });

  if (!user) {
    throw new Error('User is not existed');
  }
};

const isEducationExisted = async (id: string) => {
  const whereFilter = {
    AND: [{ id: id }, { archived: false }],
  };
  const education = await prisma.education.findFirst({
    where: whereFilter,
  });
  if (!education) {
    throw new Error('Education information is not existed');
  }
};

export default class EducationServices {
  static createEducation = async (
    userId: string,
    body: CreateOrUpdateEducationServiceProps,
  ) => {
    await isUserExisted(userId);
    const newEducation = await prisma.education.create({
      data: {
        ...body,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newEducation;
  };

  static bulkCreate = async (
    userId: string,
    educations: CreateOrUpdateEducationServiceProps[],
  ) => {
    await isUserExisted(userId);

    await prisma.education.deleteMany({
      where: {
        userId
      },
    });

    const newEducations = await prisma.education.createMany({
      data: educations ? educations.map(education => ({
        degree: education.degree,
        school: education.school,
        startDate: education.startDate,
        endDate: education.endDate,
        userId
      })): [],
    });
    return newEducations;
  };

  static updateEducation = async (
    userId: string,
    educationId: string,
    body: CreateOrUpdateEducationServiceProps,
  ) => {
    await isUserExisted(userId);
    await isEducationExisted(educationId);

    const educationUpdated = await prisma.education.update({
      where: { id: educationId },
      data: body,
    });

    return educationUpdated;
  };

  static getEducationByEduId = async (userId: string, educationId: string) => {
    await isUserExisted(userId);

    const whereFilter = {
      AND: [{ id: educationId }, { archived: false }],
    };
    const education = await prisma.education.findFirst({
      where: whereFilter,
    });

    return education;
  };

  static deleteEducationByEduId = async (
    userId: string,
    educationId: string,
  ) => {
    await isUserExisted(userId);
    await isEducationExisted(educationId);

    const education = await prisma.education.update({
      where: { id: educationId },
      data: {
        archived: true,
      },
    });

    return education;
  };

  static getEducationsByUserId = async (
    userId: string,
    params: QueryParamGetEducationByUserId,
  ) => {
    await isUserExisted(userId);

    const { page, limit } = getPageAndLimitFromParams(params);
    const { school, degree, startDate, endDate } = params;
    const whereFilter = {
      AND: [
        { school: { contains: school } },
        { degree: degree },
        { startDate: { gte: startDate } },
        { endDate: { lte: endDate } },
        { archived: false },
      ],
    };
    const [totalEducationItem, educationItems] = await prisma.$transaction([
      prisma.education.count({
        where: whereFilter,
      }),
      prisma.education.findMany({
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
