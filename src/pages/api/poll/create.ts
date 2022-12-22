import pollController from '@backend/controller/pollController';
import { applyRateLimit } from '@src/utils/rateLimit';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await applyRateLimit(req, res);
      await pollController.createPoll(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
