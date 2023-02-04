import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import NewsController from 'src/modules/news/controller/news.controller';

const handler = nc();

handler.use(extractTenantId).get(NewsController.getListNewsPublic);

export default handler;
