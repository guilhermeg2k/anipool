import pollService from '@backend/service/pollService';
import { getTokenPayload } from '@utils/authUtils';
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

const createPoll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, endDate, options, multiOptions } = req.body;
    const { userToken } = req.cookies;
    const { id } = await getTokenPayload(String(userToken));

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
  createPoll,
};

export default pollController;
