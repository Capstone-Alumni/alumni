import { extractTenantIdFromSession } from '@lib/next-connect';
import { extractUser } from '@lib/next-connect/apiMiddleware';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import PingController from '../../../../../modules/profiles/controller/ping.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantIdFromSession);

handler.post(extractUser, PingController.sendMessage);

export default handler;
