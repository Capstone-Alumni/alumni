import { extractTenantId } from '@lib/next-connect';
import { verifyAdminOrMod } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import ReportFundController from '../../../../../../modules/funds/controllers/reportFund.controller';
import { isAuthenticatedUser } from '../../../../../../lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(isAuthenticatedUser, ReportFundController.getById)
  .put(verifyAdminOrMod, ReportFundController.update)
  .delete(verifyAdminOrMod, ReportFundController.delete);

export default handler;
