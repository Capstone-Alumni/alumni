import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';
import { verifySchoolAdmin } from '../../../lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(verifySchoolAdmin, ClassController.getList)
  .post(verifySchoolAdmin, ClassController.create);

export default handler;
