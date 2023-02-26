import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import PostLikeController from 'src/modules/posts/controllers/postLike.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler
  .post(isAuthenticatedUser, PostLikeController.like)
  .delete(isAuthenticatedUser, PostLikeController.unlike);

export default handler;
