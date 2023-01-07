import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import SchoolYearController from '@share/controllers/schoolYear.controller';

export default function schoolYearHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return SchoolYearController.getPublicList(req, res);
    case 'POST':
      return SchoolYearController.create(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
