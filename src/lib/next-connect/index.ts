import nc, { NextHandler } from 'next-connect';
import { NextApiRequest, NextApiResponse } from 'next';
import onErrorAPIHandler from './onErrorAPIHandler';
import onNoMatchAPIHandler from './onNoMatchAPIHandler';

export type NextApiRequestWithTenant = {
  tenantId: string;
} & NextApiRequest;

export const extractTenantId = async (
  req: NextApiRequestWithTenant,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const tenantId = req.cookies['tenant-id'];

  console.log(tenantId);

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
