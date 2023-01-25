import appNextConnect from '@lib/next-connect';
import SessionController from 'src/modules/sessions/controllers/session.controller';

const handler = appNextConnect.post(SessionController.signIn);

export default handler;
