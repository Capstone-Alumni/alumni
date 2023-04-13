import { hashSync } from 'bcrypt';

import {
  CreateMemberServiceProps,
  GetMemberListServiceProps,
  UpdateMemberInfoByIdServiceProps,
} from '../types';
import { PrismaClient } from '@prisma/client';

export default class MemberService {
  static create = async (
    tenantPrisma: PrismaClient,
    { tenantId, gradeClass, ...memberData }: CreateMemberServiceProps,
  ) => {
    const flattenClass = gradeClass.reduce((red: any[], { alumClass }) => {
      return red.concat(alumClass.map(cl => cl.value));
    }, []);

    if (!memberData.fullName || gradeClass?.length === 0) {
      throw new Error('invalid data');
    }

    const member = await tenantPrisma.alumni.create({
      data: {
        tenantId: tenantId,
      },
    });

    await tenantPrisma.alumniToClass.createMany({
      data: flattenClass.map(c => ({ alumClassId: c, alumniId: member.id })),
    });

    await tenantPrisma.information.create({
      data: {
        ...memberData,
        alumniId: member.id,
      },
    });

    return member;
  };

  static getList = async (
    tenantPrisma: PrismaClient,
    params: GetMemberListServiceProps,
  ) => {
    const { name, page, limit } = params;

    const whereFilter = {
      information: {
        fullName: { contains: name },
      },
      archived: false,
    };

    const [totalMemberItem, MemberItems] = await tenantPrisma.$transaction([
      tenantPrisma.alumni.count({
        where: whereFilter,
      }),
      tenantPrisma.alumni.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: whereFilter,
        include: {
          information: true,
          alumniToClass: {
            include: {
              alumClass: true,
            },
          },
        },
      }),
    ]);

    return {
      totalItems: totalMemberItem,
      items: MemberItems,
      itemPerPage: limit,
    };
  };

  static updateInfoById = async (
    id: string,
    data: UpdateMemberInfoByIdServiceProps,
  ) => {
    let member = await prisma.alumni.findUnique({
      where: {
        id: id,
      },
      include: {
        tenant: true,
      },
    });

    if (data.password) {
      const encryptedPassword = hashSync(data.password, 10);

      await prisma.account.update({
        where: {
          id: member?.accountId,
        },
        data: {
          password: encryptedPassword,
        },
      });
    }

    if (data.accessLevel) {
      if (
        member?.accessLevel === 'SCHOOL_ADMIN' ||
        data.accessLevel === 'SCHOOL_ADMIN'
      ) {
        return member;
      }

      member = await prisma.alumni.update({
        where: {
          id: id,
        },
        data: {
          accessLevel: data.accessLevel,
        },
        include: {
          tenant: true,
        },
      });

      const alumniQuery = `
        UPDATE ${member?.tenant.tenantId}.alumni SET access_level = $1::"template"."AccessLevel" WHERE id = $2;
      `;
      await mainAppPrisma.$executeRawUnsafe(alumniQuery, data.accessLevel, id);
    }

    return member;
  };
}
