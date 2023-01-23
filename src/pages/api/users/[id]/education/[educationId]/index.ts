import { NextApiRequest, NextApiResponse } from 'next';
import EducationController from 'src/modules/profiles/controller/education.controller';

export default function educationIdHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      return EducationController.getEducationByEduId(req, res);
    case 'PUT':
      return EducationController.updateEducation(req, res);
    case 'DELETE':
      return EducationController.deleteducation(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
