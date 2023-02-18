import { extractTenantId } from '@lib/next-connect';
import { verifyAdminOrMod } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import AdminEventController from 'src/modules/events/controllers/adminEvent.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(verifyAdminOrMod, AdminEventController.getById)
  .put(verifyAdminOrMod, AdminEventController.approve)
  .delete(verifyAdminOrMod, AdminEventController.reject);

export default handler;
