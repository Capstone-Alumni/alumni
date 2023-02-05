import { extractTenantId } from '@lib/next-connect';
import nc from 'next-connect';
import InformationController from 'src/modules/profiles/controller/information.controller';

const handler = nc();

handler
  .use(extractTenantId)
  .get(InformationController.getInformationByUserId)
  .put(InformationController.updateInformationByUserId);

export default handler;
