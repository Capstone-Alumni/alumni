import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';

import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import { isAuthenticatedUser } from '@lib/next-connect/apiMiddleware';
import PostController from 'src/modules/posts/controllers/post.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.delete(isAuthenticatedUser, PostController.deletePost);

export default handler;
