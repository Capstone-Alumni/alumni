import appNextConnect from '@lib/next-connect';
import UserController from '../../../../modules/user/controllers/user.controller';

const handler = appNextConnect.put(UserController.verifyAccount);

export default handler;
