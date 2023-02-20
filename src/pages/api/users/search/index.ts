import { extractTenantId } from '@lib/next-connect';
import onErrorAPIHandler from '@lib/next-connect/onErrorAPIHandler';
import onNoMatchAPIHandler from '@lib/next-connect/onNoMatchAPIHandler';
import nc from 'next-connect';
import InformationController from 'src/modules/profiles/controller/information.controller';

const handler = nc({
  onError: onErrorAPIHandler,
  onNoMatch: onNoMatchAPIHandler,
}).use(extractTenantId);

handler.get(InformationController.getUsersInfomationByName);

export default handler;
