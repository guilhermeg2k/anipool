import pollService from '@backend/service/pollService';
import {
  CreatePollBody,
  GetQueryParams,
  GetResultQueryParams,
  ListByUserIdQueryParams,
  validateCreatePollBody,
  validateGetQueryParams,
  validateGetResultQueryParams,
  validateListByUserIdQueryParams,
} from '@backend/validators/pollValidators';
import { getTokenPayload } from '@utils/authUtils';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateGetQueryParams(req.query);
    const { id } = req.query as GetQueryParams;
    const poll = await pollService.get(String(id));
    return res.status(200).send(poll);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send('Bad request');
    }
    return res.status(500).send('Internal server error');
  }
};

const listByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateListByUserIdQueryParams(req.query);
    const { userId } = req.query as ListByUserIdQueryParams;
    const poll = await pollService.listByUserId(String(userId));
    return res.status(200).send(poll);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send('Bad request');
    }
    return res.status(500).send('Internal server error');
  }
};

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateGetResultQueryParams(req.query);
    const { pollId } = req.query as GetResultQueryParams;
    const pollResults = await pollService.getResult(String(pollId));
    return res.status(200).send(pollResults);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send('Bad request');
    }
    return res.status(500).send('Internal server error');
  }
};

const createPoll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateCreatePollBody(req.body);

    const { title, endDate, options, multiOptions } =
      req.body as CreatePollBody;
    const { userToken } = req.cookies;
    const { id: userId } = await getTokenPayload(String(userToken));

    const pollId = await pollService.createAndReturnId({
      userId,
      title,
      endDate,
      options,
      multiOptions,
    });

    return res.status(200).send(pollId);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).send('Bad request');
    }
    return res.status(500).send('Internal server error');
  }
};

const pollController = {
  get,
  listByUserId,
  getResult,
  createPoll,
};

export default pollController;
