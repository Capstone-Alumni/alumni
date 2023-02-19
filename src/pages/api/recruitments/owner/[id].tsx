import { extractTenantId } from '@lib/next-connect';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import RecruitmentController from 'src/modules/recruitments/controllers/recruitment.controller';
import AdminRecruitmentController from '../../../../modules/recruitments/controllers/adminRecruitment.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(isAuthenticatedUser, AdminRecruitmentController.getById)
  .delete(isAuthenticatedUser, RecruitmentController.delete)
  .put(isAuthenticatedUser, RecruitmentController.update);

export default handler;
