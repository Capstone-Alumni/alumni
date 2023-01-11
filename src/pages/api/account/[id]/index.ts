import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import AccountController from 'src/modules/account/controller/account.controller';

export default function accountHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case 'PUT':
      return AccountController.update(req, res);
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
