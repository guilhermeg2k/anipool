import pollVoteService from '@backend/service/pollVoteService';
import { getTokenPayload } from '@utils/authUtils';
import { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import {
  CreateBody,
  CREATE_VALIDATION_ERRORS,
  GetPollResultsQuery,
  GetUserVotesOnPollQuery,
  validateCreateRequest,
  validateGetPollResultsQuery,
  validateGetUserVotesOnPollQuery,
} from './validators/pollVoteControllerValidators';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userToken } = req.cookies;
    const { id: userId } = await getTokenPayload(String(userToken));

    await validateCreateRequest(req.body, userId);
    const { pollVotes, pollId } = req.body as CreateBody;

    await pollVoteService.create(userId, pollId, pollVotes);
    return res.status(200).send('Votes computed');
  } catch (error) {
    return handleError(error, res);
  }
};

const getUserVotesOnPoll = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    validateGetUserVotesOnPollQuery(req.query);

    const { userToken } = req.cookies;
    const { id: userId } = await getTokenPayload(String(userToken));
    const { pollId } = req.query as GetUserVotesOnPollQuery;

    const userPollVotes = await pollVoteService.getUserVotesOnPoll(
      userId,
      pollId
    );

    return res.status(200).send(userPollVotes);
  } catch (error) {
    return handleError(error, res);
  }
};

const getPollResults = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    validateGetPollResultsQuery(req.query);

    const { pollId } = req.query as GetPollResultsQuery;
    const pollOptionsResult = await pollVoteService.getPollVotes(pollId);
    return res.status(200).send(pollOptionsResult);
  } catch (error) {
    return handleError(error, res);
  }
};

const handleError = (error: unknown, res: NextApiResponse) => {
  const isValidationError =
    CREATE_VALIDATION_ERRORS.includes(error as Error) ||
    error instanceof ZodError;

  if (isValidationError) {
    return res.status(400).send('Bad request');
  }

  return res.status(500).send('Internal server error');
};

const pollVoteController = {
  getPollResults,
  getUserVotesOnPoll,
  create,
};

export default pollVoteController;
