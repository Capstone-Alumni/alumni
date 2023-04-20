import { extractTenantId } from '@lib/next-connect';
import {
  extractUser,
  verifySchoolAdmin,
} from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import ReportsController from 'src/modules/reports/controller/reports.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.get(verifySchoolAdmin, ReportsController.getList);
handler.post(ReportsController.create);

export default handler;
