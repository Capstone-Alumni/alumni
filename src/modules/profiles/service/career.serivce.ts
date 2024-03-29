import { PrismaClient } from '@prisma/client';
import { User } from 'next-auth';
import { canViewInformationDetail } from '../helpers/canViewInformationDetail';
import {
  CreateCareerServiceProps,
  GetCareerListServiceParams,
  UpdateCareerInfoByIdServiceProps,
} from '../types';
import { Member } from 'src/modules/members/types';

// const isUserExisted = async (id: string) => {
//   const user = await prisma.user.findFirst({
//     where: { id: id },
//   });

//   if (!user) {
//     throw new Error('user not exist');
//   }
// };

const canViewCareers = (
  alumniInformation: Member | null,
  requesterInformation: Member | null,
) => {
  const { information: userInformation } = alumniInformation || {};
  if (!userInformation || !alumniInformation) {
    return false;
  }

  if (alumniInformation.id === requesterInformation?.id) {
    return true;
  }

  if (
    !canViewInformationDetail(
      userInformation.careerPublicity,
      alumniInformation,
      requesterInformation,
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

    await tenantPrisma.$disconnect();

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

    await tenantPrisma.$disconnect();

    return newCareers;
  };

  static getListByUserId = async (
    tenantPrisma: PrismaClient,
    requestUser: User,
    userId: string,
    params: GetCareerListServiceParams,
  ) => {
    const requesterInformation = await tenantPrisma.alumni.findUnique({
      where: { id: requestUser.id },
      include: {
        information: true,
        pingReceived: true,
        pingSent: true,
        alumniToClass: {
          include: {
            alumClass: {
              include: {
                grade: true,
              },
            },
          },
        },
        gradeMod: {
          include: {
            grade: true,
          },
        },
      },
    });

    const userInformation = await tenantPrisma.alumni.findUnique({
      where: { id: userId },
      include: {
        information: true,
        pingReceived: true,
        pingSent: true,
        alumniToClass: {
          include: {
            alumClass: {
              include: {
                grade: true,
              },
            },
          },
        },
        gradeMod: {
          include: {
            grade: true,
          },
        },
      },
    });

    if (!canViewCareers(userInformation, requesterInformation)) {
      return {
        totalItems: 0,
        items: {},
        itemPerPage: 0,
      };
    }

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

    await tenantPrisma.$disconnect();

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

    await tenantPrisma.$disconnect();

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

    await tenantPrisma.$disconnect();

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

    await tenantPrisma.$disconnect();

    return career;
  };
}
