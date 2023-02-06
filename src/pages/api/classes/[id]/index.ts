import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';
import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';

const handler = nc();

handler
  .use(extractTenantId)
  .get(verifySchoolAdmin, ClassController.getById)
  .put(verifySchoolAdmin, ClassController.updateInfoById)
  .delete(verifySchoolAdmin, ClassController.deleteById);

export default handler;
