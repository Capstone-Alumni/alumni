import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import UserController from '../../../../modules/user/controllers/user.controller';

export default function verifyHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'PUT':
      return UserController.verifyAccount(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
