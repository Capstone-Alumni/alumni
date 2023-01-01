import { NextApiRequest, NextApiResponse } from 'next';
import SessionController from 'src/modules/sessions/controller/session.controller';

export default function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return SessionController.signUp(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
