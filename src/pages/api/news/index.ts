import appNextConnect from '@lib/next-connect';
import {
  isAuthenticatedUser,
  verifySchoolAdmin,
} from '@lib/next-connect/apiMiddleware';
import NewsController from 'src/modules/news/controller/news.controller';

const handler = appNextConnect
  .use(isAuthenticatedUser)
  .get(NewsController.getListNews)
  .post(verifySchoolAdmin, NewsController.createNews);

export default handler;
