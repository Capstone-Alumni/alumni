import appNextConnect from '@lib/next-connect';
import SessionController from 'src/modules/sessions/controllers/session.controller';

const handler = appNextConnect.post(SessionController.signUp);

export default handler;
