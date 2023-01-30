import appNextConnect from '@lib/next-connect';
import CareerController from '../../../../../modules/profiles/controller/career.controller';

const handler = appNextConnect
  .get(CareerController.getListByUserId)
  .post(CareerController.createCareer)
  .put(CareerController.updateCareers);

export default handler;
