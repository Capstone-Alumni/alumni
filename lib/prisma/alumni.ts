import { prisma } from '@/lib/prisma/prisma';
import { AlumCreateRequest } from 'pages/types/apiRequests';

export const createAlum = async (data: AlumCreateRequest) => {
  try {
    const alum = await prisma.user.create({
      data: data,
    });
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
