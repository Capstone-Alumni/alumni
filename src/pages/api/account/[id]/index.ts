import appNextConnect from '@lib/next-connect';
import AccountController from 'src/modules/account/controller/account.controller';

const handler = appNextConnect.put(AccountController.update);

export default handler;
