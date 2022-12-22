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

const getResult = async (id: string) => {
  const poll = await pollRepository.get(id);
  const pollVotes = await pollVoteService.getpollResults(id);

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
  getResult,
  createAndReturnId,
};

export default pollService;
