import pollRepository from '@backend/repository/pollRepository';
import { isAfter } from 'date-fns';
import pollVoteService from './pollVoteService';
import userService from './userService';

const get = async (id: string) => {
  const poll = await pollRepository.get(id);
  const pollCreator = await userService.get(poll.userId!);

  const pollWithCreator = {
    ...poll,
    creator: {
      nickname: pollCreator.nickname,
      avatarUrl: pollCreator.avatarUrl,
    },
  };

  return pollWithCreator;
};

const listByUserId = async (userId: string) => {
  const polls = await pollRepository.listByUserId(userId);
  const pollSortedByCreatedAt = polls.sort((pollA, pollB) => {
    const createdAtA = new Date(pollA.createdAt!).getTime();
    const createdAtB = new Date(pollB.createdAt!).getTime();
    return createdAtB - createdAtA;
  });

  return pollSortedByCreatedAt;
};

const getResult = async (id: string, userId?: string) => {
  const poll = await pollRepository.get(id);

  const shouldNotReturnResults =
    poll.resultsVisibility === 'AFTER_END' &&
    userId !== poll.userId &&
    isAfter(new Date(poll.endDate), new Date());

  if (shouldNotReturnResults) {
    return [];
  }

  const pollVotes = await pollVoteService.getPollVotes(id);

  const pollResults = poll.options.map((option) => {
    const optionVotes = pollVotes?.filter(
      (vote) => vote.anilistId === option.anilistId && vote.type === option.type
    );

    return {
      ...option,
      votes: optionVotes ? optionVotes?.length : 0,
    } as PollResult;
  });

  return pollResults;
};

const createAndReturnId = async (poll: Poll) => {
  const id = await pollRepository.createAndReturnId(poll);
  return id;
};

const deleteById = async (pollId: string, userId: string) => {
  const poll = await get(pollId);
  if (poll.userId === userId) {
    await pollRepository.deleteById(pollId);
  }
};

const pollService = {
  get,
  listByUserId,
  getResult,
  createAndReturnId,
  deleteById,
} as const;

export default pollService;
