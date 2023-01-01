import { hashSync } from 'bcrypt';
import { omit } from 'lodash';
import { prisma } from '@lib/prisma/prisma';
import { SignUpRequestBody } from '../types';

export default class SessionService {
  static signUp = async ({ email, username, password }: SignUpRequestBody) => {
    const existedUsers = await prisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existedUsers.length) {
      throw new Error('existed');
    }

    const passwordEncrypted = hashSync(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordEncrypted,
      },
    });

    return omit(newUser, 'password');
  };
}
