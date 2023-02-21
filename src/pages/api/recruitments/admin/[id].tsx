import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import { verifySchoolAdmin } from '../../../../lib/next-connect/apiMiddleware';
import AdminRecruitmentController from '../../../../modules/recruitments/controllers/adminRecruitment.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(verifySchoolAdmin, AdminRecruitmentController.getById)
  .put(verifySchoolAdmin, AdminRecruitmentController.approve)
  .delete(verifySchoolAdmin, AdminRecruitmentController.reject);

export default handler;
