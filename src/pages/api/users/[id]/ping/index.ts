import { extractTenantId, extractTenantIdFromSession } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import PingController from '../../../../../modules/profiles/controller/ping.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantIdFromSession);

handler.use(extractTenantId).post(PingController.sendMessage);

export default handler;
