import CareerController from '../../../../../../modules/profiles/controller/career.controller';
import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(CareerController.getById)
  .put(CareerController.updateCareerById)
  .delete(CareerController.deleteById);

export default handler;
