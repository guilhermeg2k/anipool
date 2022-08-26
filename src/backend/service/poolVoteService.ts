import poolVotesRepository from '@backend/repository/poolVoteRepository';

const getPoolVotes = async (poolId: string) => {
  const poolVotes = await poolVotesRepository.getByPoolId(poolId);
  return poolVotes;
};

const getUserVotesOnPool = async (userId: string, poolId: string) => {
  const userVotes = await poolVotesRepository.getByUserIdAndPoolId(
    userId,
    poolId
  );

  return userVotes;
};

const create = async (
  userId: string,
  poolId: string,
  poolVotes: Array<PoolOption>
) => {
  const parsedPoolVotes = Array<PoolVote>();

  poolVotes.forEach((poolVote: PoolOption) => {
    parsedPoolVotes.push({
      ...poolVote,
      poolId,
      userId,
    });
  });

  await poolVotesRepository.create(parsedPoolVotes);
};

const poolVoteService = {
  getPoolResults: getPoolVotes,
  getUserVotesOnPool,
  create,
};

export default poolVoteService;
