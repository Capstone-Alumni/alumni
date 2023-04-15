import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { NextHandler } from 'next-connect';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export const verifySchoolAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    throw new Error('unauthorized');
  }

  req.user = session.user;

  next();
};

export const verifyAdminOrMod = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    throw new Error('unauthorized');
  }

  req.user = session.user;

  next();
};

export const isAuthenticatedUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  console.log('server session', session);

  if (!session) {
    throw new Error('unauthorized');
  }

  req.user = session?.user;

  next();
};

export const extractUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session) {
    req.user = session?.user;
  }
  next();
};
