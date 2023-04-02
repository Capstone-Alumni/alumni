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

handler
  .get(PublicEventController.getParticipantList)
  .post(isAuthenticatedUser, PublicEventController.joinEvent)
  .delete(isAuthenticatedUser, PublicEventController.unjoinEvent);

export default handler;
