import EducationController from 'src/modules/profiles/controller/education.controller';
import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(EducationController.getEducationByEduId)
  .put(EducationController.updateEducation)
  .delete(EducationController.deleteducation);

export default handler;
