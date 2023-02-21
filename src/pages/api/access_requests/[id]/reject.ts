import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import AccessRequestController from 'src/modules/verifyAccount/controllers/accessRequest.controller';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.put(isAuthenticatedUser, AccessRequestController.rejectAccessRequest);

export default handler;
