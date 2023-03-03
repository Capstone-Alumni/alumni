import { extractTenantId } from '@lib/next-connect';
import { extractUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import EducationController from 'src/modules/profiles/controller/education.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId, extractUser);

handler
  .get(extractUser, EducationController.getEducationsByUserId)
  .post(EducationController.create)
  .put(EducationController.createManyRecords);

export default handler;
