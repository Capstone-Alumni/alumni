import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import SessionController from 'src/modules/sessions/controllers/session.controller';

export default function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return SessionController.signIn(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
