import { extractTenantId } from '@lib/next-connect';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import OwnerFundController from 'src/modules/funds/controllers/ownerFundController';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(isAuthenticatedUser, OwnerFundController.getById)
  .put(isAuthenticatedUser, OwnerFundController.updateById)
  .delete(isAuthenticatedUser, OwnerFundController.deleteById);

export default handler;
