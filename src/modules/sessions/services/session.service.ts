import {
  SignInRequestBody,
  SignUpRequestBody,
  UpdatePasswordRequestBody,
} from '../types';
import { PrismaClient } from '@prisma/client';

export default class SessionService {
  static signUp = async (
    tenantPrisma: PrismaClient,
    { fullName, phone, dateOfBirth, gradeClass, email }: SignUpRequestBody,
  ) => {
    if (!email || gradeClass.length !== 1 || !fullName) {
      throw new Error('invalid');
    }

    const requested = await tenantPrisma.accessRequest.findMany({
      where: {
        email: email,
        alumniId: null,
        requestStatus: {
          lt: 2,
        },
      },
    });

    const info = await tenantPrisma.information.findMany({
      where: {
        email: email,
      },
    });

    if (requested.length > 0 || info.length > 0) {
      throw new Error('existed');
    }

    const newAccessRequest = await tenantPrisma.accessRequest.create({
      data: {
        fullName,
        phone,
        dateOfBirth,
        alumClassId: gradeClass[0].alumClass.id,
        email,
      },
    });

    return newAccessRequest;
  };

  static signIn = async (
    tenantPrisma: PrismaClient,
    { usernameOrEmail, password: passwordInputted }: SignInRequestBody,
  ) => {
    // const existedUsers = await tenantPrisma.user.findMany({
    //   where: {
    //     OR: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    //   },
    // });
    // if (existedUsers.length !== 1) {
    //   throw new Error('sign-in failed');
    // }
    // const user = existedUsers[0];
    // const { password } = user;
    // if (password && compareSync(passwordInputted, password)) {
    //   return omit(user, 'password');
    // }
    // throw new Error('sign-in failed');
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
