import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';
import onErrorAPIHandler from '../../../../lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '../../../../lib/next-connect/onNoMatchAPIHandler';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(ClassController.getById)
  .put(ClassController.updateInfoById)
  .delete(ClassController.deleteById);

export default handler;
