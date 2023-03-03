import getPrismaClient from '@lib/prisma/prisma';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';
import AccessRequestService from '../services/accessRequest.service';

export const getOwnedAccessRequest = async () => {
  const session = await getServerSession(nextAuthOptions);
  const tenantId = cookies().get('tenant-id')?.value || '';
  const userId = session?.user.id || '';

  const prisma = await getPrismaClient(tenantId);

  try {
    const data = await AccessRequestService.getAccessRequestByUserId(prisma, {
      userId: userId,
    });

    if (data) {
      return {
        ...data,
        createdAt: data.createdAt.toDateString(),
        updatedAt: data.updatedAt.toDateString(),
      };
    }

    return undefined;
  } catch {
    return undefined;
  }
};
