import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import GradeController from '@share/controllers/grade.controller';

export default function gradeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return GradeController.getById(req, res);
    case 'PUT':
      return GradeController.updateInfoById(req, res);
    case 'DELETE':
      return GradeController.deleteById(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
