import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';
import { verifySchoolAdmin } from '../../../lib/next-connect/apiMiddleware';

const handler = nc();

handler
  .use(extractTenantId)
  .get(verifySchoolAdmin,ClassController.getList)
  .post(verifySchoolAdmin,ClassController.create);

export default handler;
