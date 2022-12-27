import authController from '@backend/controller/authController';
import { applyRateLimit } from '@utils/rateLimit';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await applyRateLimit(req, res);
      await authController.signIn(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
