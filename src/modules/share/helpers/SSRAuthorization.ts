import { Tenant } from '@share/states';
import getSubdomain from '@share/utils/getSubdomain';
import { getTenantData } from '@share/utils/getTenantData';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

const ADMIN_OR_MOD = ['CLASS_MOD', 'GRADE_MOD', 'SCHOOL_ADMIN'];

export const getTenantDataSSR = cache(async (): Promise<Tenant> => {
  const subdomain = getSubdomain();
  const res = await getTenantData(subdomain || '');
  const { data } = res;

  return data;
});

export const verifyUser = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/sign_in');
  }

  return session;
};

export const verifyAdminOrMod = async () => {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/sign_in');
  }

  if (
    !session.user.accessLevel ||
    !ADMIN_OR_MOD.includes(session.user.accessLevel)
  ) {
    redirect('/403_error');
  }

  return session;
};
