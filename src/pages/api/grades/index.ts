import appNextConnect from '@lib/next-connect';
import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';
import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

const handler = appNextConnect
  .get(GradeController.getPublicList)
  .post(verifySchoolAdmin, GradeController.create);

export default handler;
