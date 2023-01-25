import { NextApiRequest, NextApiResponse } from 'next';
import nc, { NextHandler } from 'next-connect';
import onErrorAPIHandler from './onErrorAPIHandler';
import onNoMatchAPIHandler from './onNoMatchAPIHandler';

export type NextApiRequestWithTenant = {
  tenantId: string;
} & NextApiRequest;

const extractTenantId = async (
  req: NextApiRequestWithTenant,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const tenantId = req.cookies['tenant-id'];

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
