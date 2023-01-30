import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from "next-auth/next"
import nc, { NextHandler } from 'next-connect';
import onErrorAPIHandler from './onErrorAPIHandler';
import onNoMatchAPIHandler from './onNoMatchAPIHandler';
import { nextAuthOptions } from "../../pages/api/auth/[...nextauth]"

export type NextApiRequestWithTenant = {
  tenantId: string;
} & NextApiRequest;

const extractTenantId = async (
  req: NextApiRequestWithTenant,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await unstable_getServerSession(req, res, nextAuthOptions);
  console.log(session);
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
