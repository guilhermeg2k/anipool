import pollService from '@backend/service/pollService';
import { NextApiRequest, NextApiResponse } from 'next';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (id) {
      const poll = await pollService.get(String(id));
      return res.status(200).send(poll);
    }

    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pollId } = req.query;

    if (pollId) {
      const pollResults = await pollService.getResult(String(pollId));
      return res.status(200).send(pollResults);
    }

    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const createpoll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, endDate, options, multiOptions } = req.body;
    const { id } = req.cookies;

    if (id && title && endDate && options && multiOptions != null) {
      const pollId = await pollService.createAndReturnId({
        userId: id,
        title,
        endDate,
        options,
        multiOptions,
      });

      return res.status(200).send(pollId);
    }
    return res.status(400).send('');
  } catch (error) {
    console.log(error);
    return res.status(500).send('');
  }
};

const pollController = {
  get,
  getResult,
  createpoll,
};

export default pollController;
