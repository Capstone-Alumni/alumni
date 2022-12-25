import { prisma } from '@/lib/prisma/prisma';
import { AlumCreateRequest } from 'pages/types/apiRequests';
import { USER_ROLE } from 'prisma/shareData';

export const createAlum = async (alumCreateRequest: AlumCreateRequest) => {
  try {
    const alum = await prisma.user.create({
      data: alumCreateRequest,
    });
    await prisma.$executeRaw`INSERT INTO users_roles(role_id, user_id) VALUES (${USER_ROLE.id}, ${alum.id})`;
    return {
      alum,
    };
  } catch (error) {
    return { error };
  }
};

export const getAlumByEmail = async (email: string) => {
  try {
    const alumnus = prisma.user.findUnique({
      where: { email },
    });
    return alumnus || null;
  } catch (error) {
    return error;
  }
};

export const getAlums = async () => {
  try {
    const alumns = await prisma.user.findMany({
      where: { archived: false },
    });
    return alumns;
  } catch (error) {
    return error;
  }
};
