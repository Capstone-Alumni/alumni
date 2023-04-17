import nc, { NextHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import onErrorAPIHandler from './onErrorAPIHandler';
import onNoMatchAPIHandler from './onNoMatchAPIHandler';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from 'src/pages/api/auth/[...nextauth]';

export type NextApiRequestWithTenant = {
  tenantId: string;
} & NextApiRequest;

export const extractTenantId = async (
  req: NextApiRequestWithTenant,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const tenantId = req.headers['tenant-id'] as string;

  if (!tenantId) {
    throw new Error('unauthorized');
  }

  req.tenantId = tenantId;

  next();
};

export const extractTenantIdFromSession = async (
  req: NextApiRequestWithTenant,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  console.log(session);
  const tenantId = session?.currentTenant?.tenantId;

  if (!tenantId) {
    throw new Error('unauthorized');
  }

  req.tenantId = tenantId;

  next();
};

const appNextConnect = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

export default appNextConnect;
