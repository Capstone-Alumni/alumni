import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import PostCommentController from 'src/modules/posts/controllers/postComment.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .put(isAuthenticatedUser, PostCommentController.getCommentList)
  .delete(isAuthenticatedUser, PostCommentController.createComment);

export default handler;
