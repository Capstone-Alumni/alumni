import { prisma } from '@lib/prisma/prisma';
import { UpdateCareerInfoByIdServiceProps } from '../types';

import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  GetCareerListServiceProps,
} from '../types';

const isUserExisted = async (id: string) => {
  if (!id) {
    throw new Error('user is not existed');
  }

  const user = await prisma.career.findUnique({
    where: { id: id },
  });

  if (!user) {
    throw new Error('user is not existed');
  }
};
export default class CareerService {
  static create = async ({
    jobTitle,
    company,
    startDate,
    endDate,
    userId,
  }: CreateCareerServiceProps) => {
    const newCareer = await prisma.career.create({
      data: {
        jobTitle: jobTitle,
        company: company,
        startDate: startDate,
        endDate: endDate,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return newCareer;
  };

  static getList = async ({ params, userId }: GetCareerListServiceProps) => {
    await isUserExisted(userId);

    const { name, page, limit } = params;

    const whereFilter = {
      AND: [
        { userId: userId },
        { name: { contains: name } },
        { archived: false },
      ],
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
