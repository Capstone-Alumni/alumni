import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import ClassController from '@share/controllers/class.controller';

export default function gradeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return ClassController.getById(req, res);
    case 'PUT':
      return ClassController.updateInfoById(req, res);
    case 'DELETE':
      return ClassController.deleteById(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
