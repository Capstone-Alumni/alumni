import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import PublicEventController from 'src/modules/events/controllers/publicEvent.controller';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.post(isAuthenticatedUser, PublicEventController.interestEvent)
handler.delete(isAuthenticatedUser, PublicEventController.uninterestEvent);

export default handler;
