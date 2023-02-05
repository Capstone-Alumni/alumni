import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import CareerController from '../../../../../modules/profiles/controller/career.controller';

const handler = nc();

handler
  .use(extractTenantId)
  .get(CareerController.getListByUserId)
  .post(CareerController.createCareer)
  .put(CareerController.updateCareers);

export default handler;
