import poolService from '@backend/service/poolService';
import { NextApiRequest, NextApiResponse } from 'next';

const createPool = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, endDate, options, multiOptions } = req.body;
    if (title && endDate && options && multiOptions != null) {
      const poolId = await poolService.createAndReturnId({
        title,
        endDate,
        options,
        multiOptions,
      });
      console.log(poolId, 'pid');
      return res.status(200).send(poolId);
    }
    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const poolController = {
  createPool,
};

export default poolController;
