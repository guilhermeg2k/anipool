import pollRepository from '@backend/repository/pollRepository';
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

const getResult = async (id: string) => {
  const poll = await pollRepository.get(id);
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

const pollService = {
  get,
  listByUserId,
  getResult,
  createAndReturnId,
};

export default pollService;
