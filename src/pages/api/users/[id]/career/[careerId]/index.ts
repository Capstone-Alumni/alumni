import appNextConnect from '@lib/next-connect';
import CareerController from '../../../../../../modules/profiles/controller/career.controller';

const handler = appNextConnect
  .get(CareerController.getById)
  .put(CareerController.updateCareerById)
  .delete(CareerController.deleteById);

export default handler;
