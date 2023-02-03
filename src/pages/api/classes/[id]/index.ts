import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import ClassController from 'src/modules/gradeAndClass/controllers/class.controller';

const handler = nc();

handler.use(extractTenantId)
.get(ClassController.getById)
.put(ClassController.updateInfoById)
.delete(ClassController.deleteById);

export default handler;
