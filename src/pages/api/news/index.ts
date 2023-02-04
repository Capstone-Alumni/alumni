import { extractTenantId } from '@lib/next-connect';
import {
  isAuthenticatedUser,
  verifySchoolAdmin,
} from '@lib/next-connect/apiMiddleware';
import nc from 'next-connect';
import NewsController from 'src/modules/news/controller/news.controller';

const handler = nc();

handler
  .use(extractTenantId)
  .use(isAuthenticatedUser)
  .get(NewsController.getListNews)
  .post(verifySchoolAdmin, NewsController.createNews);

export default handler;
