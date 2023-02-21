import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import PublicFundController from 'src/modules/funds/controllers/publicFund.controller';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .post(isAuthenticatedUser, PublicFundController.saveFund)
  .delete(isAuthenticatedUser, PublicFundController.unsaveFund);

export default handler;
