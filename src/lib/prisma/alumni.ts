import { prisma } from 'src/lib/prisma/prisma';
import { AlumCreateRequest } from 'src/pages/types/apiRequests';
import { exclude } from './helpers';
import { User } from '@prisma/client';

export const createAlum = async (alumCreateRequest: AlumCreateRequest) => {
  try {
    const newAlum = await prisma.user.create({
      data: alumCreateRequest,
    });
    const alumResponse = exclude(newAlum, ['password']);
    return {
      ...alumResponse,
    };
  } catch (error) {
    return { error };
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const alum = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return alum || null;
  } catch (error) {
    return error;
  }
};

export const findUserByUsername = async (username: string) => {
  try {
    const alum = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return alum || null;
  } catch (error) {
    return error;
  }
};

export const getAlums = async () => {
  try {
    const alumns = await prisma.user.findMany({
      where: {
        archived: false,
      },
    });
    const alumsResponse = alumns.map((alum: User) =>
      exclude(alum, ['password']),
    );
    return alumsResponse;
  } catch (error) {
    return error;
  }
};
