import { compareSync, hashSync } from 'bcrypt';
import { omit } from 'lodash';
import { prisma } from '@lib/prisma/prisma';
import { SignInRequestBody, SignUpRequestBody } from '../types';

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

  static signIn = async ({
    usernameOrEmail,
    password: passwordInputted,
  }: SignInRequestBody) => {
    const existedUsers = await prisma.user.findMany({
      where: {
        OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
    });

    if (existedUsers.length !== 1) {
      throw new Error('sign-in failed');
    }

    const user = existedUsers[0];
    const { password } = user;

    if (password && compareSync(passwordInputted, password)) {
      return omit(user, 'password');
    }

    throw new Error('sign-in failed');
  };
}
