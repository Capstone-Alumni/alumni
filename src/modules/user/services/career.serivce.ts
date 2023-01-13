import { prisma } from '@lib/prisma/prisma';
import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  UpdateCareerInfoByIdServiceProps,
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
  static create = async (userId: string, body: CreateCareerServiceProps) => {
    isUserExisted(userId);
    const newCareer = await prisma.career.create({
      data: {
        jobTitle: body.jobTitle,
        company: body.company,
        startDate: body.startDate,
        endDate: body.endDate,
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
    await isUserExisted(userId);

    const { page, limit } = params;

    const whereFilter = {
      AND: [{ userId: userId }, { archived: false }],
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
