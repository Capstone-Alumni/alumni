import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import { verifyAdminOrMod } from '@lib/next-connect/apiMiddleware';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import AdminFundController from 'src/modules/funds/controllers/adminFund.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.get(verifyAdminOrMod, AdminFundController.getList);

export default handler;
