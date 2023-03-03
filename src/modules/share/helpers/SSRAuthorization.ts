import { Tenant } from '@share/states';
import { getTenantData } from '@share/utils/getTenantData';
import { unstable_getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

const ADMIN_OR_MOD = ['CLASS_MOD', 'GRADE_MOD', 'SCHOOL_ADMIN'];

export const getTenantDataSSR = async (): Promise<Tenant> => {
  const tenant = cookies().get('tenant-subdomain');
  const res = await getTenantData(tenant?.value || '');
  const { data } = res;

  return data;
};

export const verifyUser = async () => {
  const session = await unstable_getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/sign_in');
  }

  return session;
};

export const verifyAdminOrMod = async () => {
  const session = await unstable_getServerSession(nextAuthOptions);

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
