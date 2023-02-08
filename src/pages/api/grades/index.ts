import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';

import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(GradeController.getPublicList)
  .post(verifySchoolAdmin, GradeController.create);

export default handler;
