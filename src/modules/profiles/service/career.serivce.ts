import { prisma } from '@lib/prisma/prisma';
import { Session } from 'inspector';
import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  UpdateCareerInfoByIdServiceProps,
} from '../types';

const isUserExisted = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { id: id },
  });

  if (!user) {
    throw new Error('user not exist');
  }
};
export default class CareerService {
  static create = async (
    userId: string,
    { jobTitle, company, startDate, endDate }: CreateCareerServiceProps,
  ) => {
    isUserExisted(userId);
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

  static getListByUserId = async (
    userId: string,
    params: GetCareerListServiceParams,
  ) => {
    isUserExisted(userId);

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

  static getById = async (careerId: string) => {
    const career = await prisma.career.findUnique({
      where: {
        id: careerId,
      },
    });

    return career;
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

  static deleteById = async (careerId: string) => {
    const careerDeleted = await prisma.career.delete({
      where: {
        id: careerId,
      },
    });

    return careerDeleted;
  };
}
