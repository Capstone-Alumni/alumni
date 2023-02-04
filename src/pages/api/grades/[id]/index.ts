import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

const handler = nc();

handler.use(extractTenantId)
.get(GradeController.getById)
.put(GradeController.updateInfoById)
.delete(GradeController.deleteById);

export default handler;
