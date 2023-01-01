import { findUserByEmail, findUserByUsername } from '@/lib/prisma/alumni';
import { compareSync } from 'bcrypt';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import { User } from '@prisma/client';
import { ApiErrorResponse, ApiSuccessResponse } from 'src/pages/types/apiResponses';
import { omit } from 'lodash';

const login = async (
  request: NextApiRequest,
  response: NextApiResponse<ApiSuccessResponse | ApiErrorResponse>,
) => {
  if (request.method !== 'POST') {
    return response.status(405).json({
      status: 'ERROR',
      message: 'Method not allowed',
    });
  }
  const { usernameOrEmail, password: passwordInputted } = request.body;

  const emailPattern = /\S+@\S+\.\S+/;
  const isEmailInputted = emailPattern.test(usernameOrEmail);

  const user = isEmailInputted
    ? ((await findUserByEmail(usernameOrEmail)) as User)
    : ((await findUserByUsername(usernameOrEmail)) as User);

  if (!user) {
    return response.status(403).json({
      status: 'ERROR',
      message: 'User not found',
    });
  }
  const { password } = user;

  if (password && compareSync(passwordInputted, password)) {
    return response.status(200).json({
      status: 'OK',
      data: omit(user, ['password']),
    });
  }
  return response.status(403).json({
    status: 'ERROR',
    message: 'Wrong password.',
  });
};

export default login;
