import poolController from '@backend/controller/poolController';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case 'POST':
      await poolController.createPool(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
