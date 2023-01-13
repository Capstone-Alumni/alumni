import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import CareerController from '../../../../../modules/profiles/controller/career.controller';

export default function careerHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return CareerController.getListByUserId(req, res);
    case 'PUT':
      return CareerController.updateCareerById(req, res);
    case 'POST':
      return CareerController.createCareer(req, res);
    case 'DELETE':
      return CareerController.deleteById(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
