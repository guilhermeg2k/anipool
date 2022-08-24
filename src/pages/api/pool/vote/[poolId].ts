import poolVoteController from '@backend/controller/poolVoteController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await poolVoteController.create(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
