import { prisma } from '@lib/prisma/prisma';
import { compareSync, hashSync } from 'bcrypt';
import { omit } from 'lodash';
import { UpdateAccountByIdProps } from '../types';
export default class AccountService {
  static update = async (id: string, body: UpdateAccountByIdProps) => {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }

    let accountUpdateInfo;
    const account = await prisma.account.findFirst({
      where: { userId: id },
    });

    if (body.username) {
      // Prevent update username if user signup by credentials or user already have username
      if (!account || user.username) {
        throw new Error("Can't update username");
      }

      // Require update password when update username
      if (!body.newPassword) {
        throw new Error('Must update password');
      }

      const isUsernameExisted = await prisma.user.findFirst({
        where: { username: body.username },
      });
      if (isUsernameExisted) {
        throw new Error('This username is already existed');
      }

      accountUpdateInfo = {
        username: body.username,
      };
    }
    const { password: passwordEncrypted } = user;
    if (body.oldPassword) {
      if (
        !passwordEncrypted ||
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        !compareSync(body.oldPassword, passwordEncrypted!)
      ) {
        throw new Error('Wrong old password');
      } else if (body.oldPassword.localeCompare(body.newPassword) === 0) {
        throw new Error('New password must be different from old password');
      }
    } else if (user.password && !body.oldPassword) {
      // Require old password inputted
      throw new Error('Please include old password');
    }

    const newPasswordEncrypted = hashSync(body.newPassword, 10);
    accountUpdateInfo = {
      ...accountUpdateInfo,
      password: newPasswordEncrypted,
    };
    const userUpdated = await prisma.user.update({
      where: { id },
      data: accountUpdateInfo,
    });

    return omit(userUpdated, 'password');
  };
}
