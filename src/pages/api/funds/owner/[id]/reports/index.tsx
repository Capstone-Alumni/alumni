import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import ReportFundController from '../../../../../../modules/funds/controllers/reportFund.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(isAuthenticatedUser, ReportFundController.getList)
  .post(isAuthenticatedUser, ReportFundController.create);

export default handler;
