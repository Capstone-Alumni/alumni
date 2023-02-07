import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';
import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '../../../../lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '../../../../lib/next-connect/onNoMatchAPIHandler';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(verifySchoolAdmin, ClassController.getById)
  .put(verifySchoolAdmin, ClassController.updateInfoById)
  .delete(verifySchoolAdmin, ClassController.deleteById);

export default handler;
