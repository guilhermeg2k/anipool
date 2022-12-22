import poolRepository from '@backend/repository/poolRepository';
import poolVoteService from './poolVoteService';
import userService from './userService';

const get = async (id: string) => {
  const pool = await poolRepository.get(id);
  const poolCreator = await userService.get(pool.userId!);

  const poolWithCreator = {
    ...pool,
    creator: {
      nickname: poolCreator.nickname,
      avatarUrl: poolCreator.avatarUrl,
    },
  };

  return poolWithCreator;
};

const getResult = async (id: string) => {
  const pool = await poolRepository.get(id);
  const poolVotes = await poolVoteService.getPoolResults(id);

  const poolResults = pool.options.map((option) => {
    const optionVotes = poolVotes?.filter(
      (vote) => vote.anilistId === option.anilistId && vote.type === option.type
    );

    return {
      ...option,
      votes: optionVotes ? optionVotes?.length : 0,
    } as PollResult;
  });

  return poolResults;
};

const createAndReturnId = async (pool: Poll) => {
  const id = await poolRepository.createAndReturnId(pool);
  return id;
};

const poolService = {
  get,
  getResult,
  createAndReturnId,
};

export default poolService;
