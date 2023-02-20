import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { NextHandler } from 'next-connect';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export const verifySchoolAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    throw new Error('unauthorized');
  }

  if (session.user.accessLevel !== 'SCHOOL_ADMIN') {
    throw new Error('denied');
  }

  req.user = session.user;

  next();
};

export const verifyAdminOrMod = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (!session) {
    throw new Error('unauthorized');
  }

  if (session.user.accessLevel === 'ALUMNI') {
    throw new Error('denied');
  }

  req.user = session.user;

  next();
};

export const isAuthenticatedUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

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
  const session = await unstable_getServerSession(req, res, nextAuthOptions);

  if (session) {
    req.user = session?.user;
  }
  next();
};
