import pollService from '@backend/service/pollService';
import pollVoteService from '@backend/service/pollVoteService';
import { z } from 'zod';

const MULTIPLE_VOTES_NOT_ALLOWED = new Error('MULTIPLE_VOTES_NOT_ALLOWED');
const POLL_HAS_ENDED = new Error('POLL_HAS_ENDED');
const USER_HAS_ALREADY_VOTED = new Error('USER_HAS_ALREADY_VOTED');

export const CREATE_VALIDATION_ERRORS = [
  MULTIPLE_VOTES_NOT_ALLOWED,
  POLL_HAS_ENDED,
  USER_HAS_ALREADY_VOTED,
];

const createBodySchema = z.object({
  pollId: z.string(),
  pollVotes: z.array(
    z.object({
      anilistId: z.number(),
      type: z.string(),
      text: z.string().optional(),
    })
  ),
});

export type CreateBody = z.infer<typeof createBodySchema>;

const validateCreateBody = (body: unknown) => {
  createBodySchema.parse(body);
};

const validateMultipleVotes = (
  poll: PollWithCreator,
  pollVotes: PollOption[]
) => {
  const areMultipleVotesValid = poll.multiOptions || pollVotes.length <= 1;
  if (!areMultipleVotesValid) {
    throw MULTIPLE_VOTES_NOT_ALLOWED;
  }
};

const validateIfPollHasEnded = (poll: PollWithCreator) => {
  const pollEndDate = new Date(poll.endDate);
  const hasPoolEnded = new Date() > pollEndDate;

  if (hasPoolEnded) {
    throw POLL_HAS_ENDED;
  }
};

const validateIfUserHasAlreadyVoted = async (
  userId: string,
  pollId: string
) => {
  const userVotes = await pollVoteService.getUserVotesOnPoll(
    String(userId),
    String(pollId)
  );

  const userHasAlreadyVoted = userVotes && userVotes.length > 0;

  if (userHasAlreadyVoted) {
    throw USER_HAS_ALREADY_VOTED;
  }
};

export const validateCreateRequest = async (body: unknown, userId: string) => {
  validateCreateBody(body);

  const { pollId, pollVotes } = body as CreateBody;
  const poll = await pollService.get(pollId);

  validateMultipleVotes(poll, pollVotes);
  validateIfPollHasEnded(poll);
  await validateIfUserHasAlreadyVoted(userId, pollId);
};

const getUserVotesOnPollQuerySchema = z.object({
  pollId: z.string(),
});

export type GetUserVotesOnPollQuery = z.infer<
  typeof getUserVotesOnPollQuerySchema
>;

export const validateGetUserVotesOnPollQuery = (query: unknown) => {
  getUserVotesOnPollQuerySchema.parse(query);
};

const getPollResultsQuery = z.object({
  pollId: z.string(),
});

export type GetPollResultsQuery = z.infer<typeof getPollResultsQuery>;

export const validateGetPollResultsQuery = (query: unknown) => {
  getPollResultsQuery.parse(query);
};
