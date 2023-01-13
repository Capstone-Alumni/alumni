import { prisma } from '@lib/prisma/prisma';
import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  UpdateCareerInfoByIdServiceProps,
} from '../types';

export default class CareerService {
  static create = async (
    id: string,
    { jobTitle, company, startDate, endDate }: CreateCareerServiceProps,
  ) => {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const newCareer = await prisma.career.create({
      data: {
        jobTitle: jobTitle,
        company: company,
        startDate: startDate,
        endDate: endDate,
        user: {
          connect: {
            id: id,
          },
        },
      },
    });
    return newCareer;
  };

  static getListByUserId = async (
    id: string,
    params: GetCareerListServiceParams,
  ) => {
    const user = await prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const { jobTitle, page, limit } = params;

    const whereFilter = {
      AND: [{ jobTitle: { contains: jobTitle } }, { archived: false }],
    };

    const [totalCareerItem, careerItems] = await prisma.$transaction([
      prisma.career.count({ where: whereFilter }),
      prisma.career.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
      }),
    ]);
    return {
      totalItems: totalCareerItem,
      items: careerItems,
      itemPerPage: limit,
    };
  };

  static getById = async (id: string) => {
    const grade = await prisma.career.findUnique({
      where: {
        id: id,
      },
    });

    return grade;
  };

  static updateCareerById = async (
    id: string,
    data: UpdateCareerInfoByIdServiceProps,
  ) => {
    const careerUpdated = await prisma.career.update({
      where: {
        id: id,
      },
      data: data,
    });
    return careerUpdated;
  };

  static deleteById = async (id: string) => {
    const careerDeleted = await prisma.career.delete({
      where: {
        id: id,
      },
    });

    return careerDeleted;
  };
}
