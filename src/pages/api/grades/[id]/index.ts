import appNextConnect from '@lib/next-connect';
import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

const handler = appNextConnect
  .get(GradeController.getById)
  .put(GradeController.updateInfoById)
  .delete(GradeController.deleteById);

export default handler;
