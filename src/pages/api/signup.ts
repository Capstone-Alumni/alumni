import { NextApiRequest, NextApiResponse } from 'next';
import SessionController from 'src/modules/sessions/controllers/session.controller';

/**
 * @swagger
 * /api/signUp:
 *   post:
 *     tags:
 *     -  Authentication
 *     description: Sign up
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *         type: long
 *         required: true
 *       - in: query
 *         name: password
 *         schema:
 *         type: long
 *         required: true
 *     responses:
 *       200:
 *         description: successfully
 */
export default function signUpHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return SessionController.signUp(req, res);
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
