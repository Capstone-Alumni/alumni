import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';
import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  InformationIncludeClass,
  UpdateCareerInfoByIdServiceProps,
} from '../types';

// const isUserExisted = async (id: string) => {
//   const user = await prisma.user.findFirst({
//     where: { id: id },
//   });

//   if (!user) {
//     throw new Error('user not exist');
//   }
// };

const canViewCareers = (
  information: InformationIncludeClass | null,
  requesterInformation: InformationIncludeClass | null,
) => {
  if (information?.userId === requesterInformation?.userId) {
    return true;
  }
  if (
    !canViewInformationDetail(
      information?.careerPublicity || 'PRIVATE',
      information?.alumClass || null,
      requesterInformation?.alumClass || null,
    )
  ) {
    return false;
  }
  return true;
};

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
        alumni: {
          connect: {
            id: userId,
          },
        },
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
            alumni: {
              connect: {
                id: userId,
              },
            },
          }))
        : [],
    });
    return newCareers;
  };

  static getListByUserId = async (
    tenantPrisma: PrismaClient,
    requestUser: User,
    userId: string,
    params: GetCareerListServiceParams,
  ) => {
    const requesterInformation = await tenantPrisma.alumni.findUnique({
      where: { id: userId },
      include: {
        information: true,
        alumniToClass: {
          select: {
            isClassMod: true,
            alumClassId: true,
          },
        },
      },
    });

    const userInformation = await tenantPrisma.alumni.findUnique({
      where: { id: userId },
      include: {
        information: true,
        alumniToClass: {
          select: {
            isClassMod: true,
            alumClassId: true,
          },
        },
      },
    });

    // if (!canViewCareers(userInformation, requesterInformation)) {
    //   return {
    //     totalItems: 0,
    //     items: {},
    //     itemPerPage: 0,
    //   };
    // }

    const { jobTitle, company, page, limit } = params;

    const whereFilter = {
      AND: [
        { alumniId: userId },
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
        orderBy: {
          startDate: 'desc',
        },
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

  static deleteById = async (tenantPrisma: PrismaClient, id: string) => {
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
