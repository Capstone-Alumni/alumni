import appNextConnect from '@lib/next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';

const handler = appNextConnect
  .get(ClassController.getList)
  .post(ClassController.create);

export default handler;
