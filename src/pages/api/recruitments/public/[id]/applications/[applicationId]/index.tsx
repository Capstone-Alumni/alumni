import { extractTenantId } from '@lib/next-connect';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import ApplicationController from 'src/modules/recruitments/controllers/recruitmentApplication.controller';
import nc from 'next-connect';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .put(isAuthenticatedUser, ApplicationController.update)
  .delete(isAuthenticatedUser, ApplicationController.delete);

export default handler;
