import { NextApiRequest, NextApiResponse } from 'next';
import InformationController from 'src/modules/profiles/controller/information.controller';

export default function informationHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;
  switch (method) {
    case 'GET':
      return InformationController.getInformationByUserId(req, res);
    case 'PUT':
      return InformationController.updateInformationByUserId(req, res);
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
