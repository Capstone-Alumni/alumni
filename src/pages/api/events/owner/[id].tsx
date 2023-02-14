import { extractTenantId } from '@lib/next-connect';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import OwnerEventController from 'src/modules/events/controllers/ownerEventController';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(isAuthenticatedUser, OwnerEventController.getById)
  .put(isAuthenticatedUser, OwnerEventController.updateById)
  .delete(isAuthenticatedUser, OwnerEventController.deleteById);

export default handler;
