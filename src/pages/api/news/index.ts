import { extractTenantIdFromSession } from '@lib/next-connect';
import {
  isAuthenticatedUser,
  verifySchoolAdmin,
} from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import NewsController from 'src/modules/news/controller/news.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantIdFromSession);

handler
  .use(isAuthenticatedUser)
  .get(verifySchoolAdmin, NewsController.getListNews)
  .post(verifySchoolAdmin, NewsController.createNews);

export default handler;
