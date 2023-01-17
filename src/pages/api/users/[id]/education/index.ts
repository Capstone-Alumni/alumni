import { NextApiRequest, NextApiResponse } from 'next';
import EducationController from 'src/modules/profiles/controller/education.controller';

export default function educationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      return EducationController.getEducationsByUserId(req, res);
    case 'POST':
      return EducationController.create(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
