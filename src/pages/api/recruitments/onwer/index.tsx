import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import RecruitmentController from '../../../../modules/recruitments/controllers/recruitment.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .get(isAuthenticatedUser, RecruitmentController.getListByOwnerId)
  .post(isAuthenticatedUser, RecruitmentController.create);

export default handler;
