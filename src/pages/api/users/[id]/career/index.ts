import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import CareerController from '../../../../../modules/profiles/controller/career.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .use(extractTenantId)
  .get(CareerController.getListByUserId)
  .post(CareerController.createCareer)
  .put(CareerController.updateCareers);

export default handler;
