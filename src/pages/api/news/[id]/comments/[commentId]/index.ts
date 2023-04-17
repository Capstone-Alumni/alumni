import { extractTenantIdFromSession } from '@lib/next-connect';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import NewsCommentController from 'src/modules/news/controller/newsComment.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantIdFromSession);

handler
  .use(isAuthenticatedUser)
  .put(NewsCommentController.updateComment)
  .delete(NewsCommentController.deleteComment);

export default handler;
