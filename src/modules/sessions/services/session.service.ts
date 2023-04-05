import { compareSync, hashSync } from 'bcrypt';
import { omit } from 'lodash';
import {
  SignInRequestBody,
  SignUpRequestBody,
  UpdatePasswordRequestBody,
} from '../types';
import { PrismaClient } from '@prisma/client';

export default class SessionService {
  static signUp = async (
    tenantPrisma: PrismaClient,
    { email, username, password }: SignUpRequestBody,
  ) => {
    const existedUsers = await tenantPrisma.user.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existedUsers.length) {
      throw new Error('existed');
    }

    const passwordEncrypted = hashSync(password, 10);

    const newUser = await tenantPrisma.user.create({
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
    const existedUsers = await tenantPrisma.user.findMany({
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

  static updatePassword = async ({
    userId,
    password: currentPassword,
    newPassword,
    subdomain,
  }: UpdatePasswordRequestBody) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_PLATFORM_HOST}/api/update_password`,
      {
        method: 'POST',
        body: JSON.stringify({
          userId,
          password: currentPassword,
          newPassword,
          subdomain,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const result = await response.json();
    return result;
  };
}
