import EducationController from 'src/modules/profiles/controller/education.controller';
import { extractTenantIdFromSession } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import { extractUser } from '@lib/next-connect/apiMiddleware';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantIdFromSession);

handler
  .get(extractUser, EducationController.getEducationByEduId)
  .put(extractUser, EducationController.updateEducation)
  .delete(extractUser, EducationController.deleteducation);

export default handler;
