import poolService from '@backend/service/poolService';
import { NextApiRequest, NextApiResponse } from 'next';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (id) {
      const pool = await poolService.get(String(id));
      return res.status(200).send(pool);
    }

    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { poolId } = req.query;

    if (poolId) {
      const poolResults = await poolService.getResult(String(poolId));
      return res.status(200).send(poolResults);
    }

    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const createPool = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, endDate, options, multiOptions } = req.body;
    const { id } = req.cookies;

    if (id && title && endDate && options && multiOptions != null) {
      const poolId = await poolService.createAndReturnId({
        userId: id,
        title,
        endDate,
        options,
        multiOptions,
      });

      return res.status(200).send(poolId);
    }
    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const poolController = {
  get,
  getResult,
  createPool,
};

export default poolController;
