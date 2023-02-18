import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import PublicEventController from 'src/modules/events/controllers/publicEvent.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.get(PublicEventController.getById);

export default handler;
