import { PrismaClient } from '@prisma/client';
import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  UpdateCareerInfoByIdServiceProps,
} from '../types';

export default class CareerService {
  static create = async (
    tenantPrisma: PrismaClient,
    userId: string,
    { jobTitle, company, startDate, endDate }: CreateCareerServiceProps,
  ) => {
    const newCareer = await tenantPrisma.career.create({
      data: {
        jobTitle: jobTitle,
        company: company,
        startDate: startDate,
        endDate: endDate,
        userId: userId,
      },
    });
    return newCareer;
  };

  static createMany = async (
    tenantPrisma: PrismaClient,
    userId: string,
    careers: CreateCareerServiceProps[],
  ) => {
    await tenantPrisma.career.deleteMany({
      where: {
        userId,
      },
    });

    const newCareers = await tenantPrisma.career.createMany({
      data: careers
        ? careers.map(career => ({
            jobTitle: career.jobTitle,
            company: career.company,
            startDate: career.startDate,
            endDate: career.endDate,
            userId,
          }))
        : [],
    });
    return newCareers;
  };

  static getListByUserId = async (
    tenantPrisma: PrismaClient,
    userId: string,
    params: GetCareerListServiceParams,
  ) => {

    const { jobTitle, company, page, limit } = params;

    const whereFilter = {
      AND: [
        { userId: userId },
        // career is deleted -> not show on list
        { archived: false },
        { jobTitle: { contains: jobTitle } },
        { company: { contains: company } },
      ],
    };

    const [totalCareerItem, careerItems] = await tenantPrisma.$transaction([
      tenantPrisma.career.count({ where: whereFilter }),
      tenantPrisma.career.findMany({
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

  static getById = async (tenantPrisma: PrismaClient, careerId: string) => {
    const career = await tenantPrisma.career.findUnique({
      where: {
        id: careerId,
      },
    });
    return career;
  };

  static updateCareerById = async (
    tenantPrisma: PrismaClient,
    id: string,
    data: UpdateCareerInfoByIdServiceProps,
  ) => {
    const careerUpdated = await tenantPrisma.career.update({
      where: {
        id: id,
      },
      data: data,
    });
    return careerUpdated;
  };

  static deleteById = async (tenantPrisma:PrismaClient, id: string) => {
    const career = await tenantPrisma.career.update({
      where: {
        id: id,
      },
      data: {
        archived: true,
      },
    });

    return career;
  };
}
