import appNextConnect from '@lib/next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';

const handler = appNextConnect
  .get(ClassController.getById)
  .put(ClassController.updateInfoById)
  .delete(ClassController.deleteById);

export default handler;
