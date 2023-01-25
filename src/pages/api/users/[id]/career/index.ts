import appNextConnect from '@lib/next-connect';
import CareerController from '../../../../../modules/profiles/controller/career.controller';

const handler = appNextConnect
  .get(CareerController.getListByUserId)
  .post(CareerController.createCareer);

export default handler;
