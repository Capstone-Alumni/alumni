import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';
import NewsController from 'src/modules/news/controller/news.controller';
import { extractTenantIdFromSession } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantIdFromSession);

handler
  .get(verifySchoolAdmin, NewsController.getNewsById)
  .put(verifySchoolAdmin, NewsController.updateNews)
  .delete(verifySchoolAdmin, NewsController.deleteNews);

export default handler;
