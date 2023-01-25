import appNextConnect from '@lib/next-connect';
import InformationController from 'src/modules/profiles/controller/information.controller';

const handler = appNextConnect
  .get(InformationController.getInformationByUserId)
  .put(InformationController.updateInformationByUserId);

export default handler;
