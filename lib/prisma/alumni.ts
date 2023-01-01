import { prisma } from '@lib/prisma/prisma';
import { AlumCreateRequest } from 'pages/types/apiRequests';
import { isNull } from 'lodash';
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

export const checkEmailIsExisted = async (email: string) => {
  try {
    const alum = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !isNull(alum);
  } catch (error) {
    return error;
  }
};

export const checkUsernameIsExisted = async (username: string) => {
  try {
    const alum = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return !isNull(alum);
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
