import pollService from '@backend/service/pollService';
import { getTokenPayload } from '@backend/utils/authUtils';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  createPollBodySchema,
  deleteByIdQueryParamsSchema,
  getQueryParamsSchema,
  getResultQueryParamsSchema,
  listByUserIdQueryParamsSchema,
} from './validators/pollControllerValidators';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = getQueryParamsSchema.parse(req.query);
    const poll = await pollService.get(String(id));
    return res.status(200).send(poll);
  } catch (error) {
    return handleError(error, res);
  }
};

const listByUserId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = listByUserIdQueryParamsSchema.parse(req.query);
    const poll = await pollService.listByUserId(String(userId));
    return res.status(200).send(poll);
  } catch (error) {
    return handleError(error, res);
  }
};

const getResult = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pollId } = getResultQueryParamsSchema.parse(req.query);
    const pollResults = await pollService.getResult(String(pollId));
    return res.status(200).send(pollResults);
  } catch (error) {
    return handleError(error, res);
  }
};

const createPoll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { title, endDate, options, multiOptions } =
      createPollBodySchema.parse(req.body);
    const { userToken } = req.cookies;
    const { id: userId } = await getTokenPayload(String(userToken));

    const pollId = await pollService.createAndReturnId({
      userId,
      title,
      endDate: endDate.toISOString(),
      options,
      multiOptions,
    });

    return res.status(200).send(pollId);
  } catch (error) {
    return handleError(error, res);
  }
};

const deleteById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pollId } = deleteByIdQueryParamsSchema.parse(req.query);
    const { userToken } = req.cookies;
    const { id: userId } = await getTokenPayload(String(userToken));
    await pollService.deleteById(pollId, userId);
    return res.status(200).send('DELETED');
  } catch (error) {
    return handleError(error, res);
  }
};

const handleError = (error: unknown, res: NextApiResponse) => {
  if (error instanceof ZodError) {
    return res.status(400).send('Bad request');
  }
  return res.status(500).send('Internal server error');
};

const pollController = {
  get,
  listByUserId,
  getResult,
  createPoll,
  deleteById,
} as const;

export default pollController;
