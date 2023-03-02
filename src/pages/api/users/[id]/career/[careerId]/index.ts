import CareerController from '../../../../../../modules/profiles/controller/career.controller';
import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import { extractUser } from '@lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId, extractUser);

handler
  .get(extractUser, CareerController.getById)
  .put(CareerController.updateCareerById)
  .delete(CareerController.deleteById);

export default handler;
