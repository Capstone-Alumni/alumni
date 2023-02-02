import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import EducationController from 'src/modules/profiles/controller/education.controller';

const handler = nc();

handler.use(extractTenantId)
.get(EducationController.getEducationsByUserId)
.post(EducationController.create)
.put(EducationController.createManyRecords);

export default handler;
