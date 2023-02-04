import appNextConnect from '@lib/next-connect';
import { verifySchoolAdmin } from '@lib/next-connect/apiMiddleware';
import NewsController from 'src/modules/news/controller/news.controller';

const handler = appNextConnect
  .get(verifySchoolAdmin, NewsController.getNewsById)
  .put(verifySchoolAdmin, NewsController.updateNews)
  .delete(verifySchoolAdmin, NewsController.deleteNews);

export default handler;
