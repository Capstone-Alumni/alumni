import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(GradeController.getById)
  .put(GradeController.updateInfoById)
  .delete(GradeController.deleteById);

export default handler;
