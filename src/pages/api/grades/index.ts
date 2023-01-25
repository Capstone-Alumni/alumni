import appNextConnect from '@lib/next-connect';
import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

const handler = appNextConnect
  .get(GradeController.getPublicList)
  .post(GradeController.create);

export default handler;
