import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';

import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

const handler = nc();

handler
  .use(extractTenantId)
  .get(GradeController.getPublicList)
  .post(verifySchoolAdmin, GradeController.create);

export default handler;
