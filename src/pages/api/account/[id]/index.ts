import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import AccountController from 'src/modules/account/controller/account.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.put(AccountController.update);

export default handler;
