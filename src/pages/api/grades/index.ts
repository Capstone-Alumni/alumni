import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import GradeController from 'src/modules/gradeAndClass/controllers/grade.controller';

export default function gradeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return GradeController.getPublicList(req, res);
    case 'POST':
      return GradeController.create(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
