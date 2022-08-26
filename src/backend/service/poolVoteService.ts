import poolVotesRepository from '@backend/repository/poolVoteRepository';

const getPoolResults = async (poolId: string) => {
  const poolVotes = await poolVotesRepository.getByPoolId(poolId);
  const poolOptionWithVotes = Array<PoolOptionWithVotes>(0);

  if (poolVotes) {
    for (const poolVote of poolVotes!) {
      const currentOptionIndex = poolOptionWithVotes.findIndex(
        (option) =>
          option.anilistId === poolVote.anilistId &&
          option.type === poolVote.type
      );

      if (currentOptionIndex !== -1) {
        poolOptionWithVotes[currentOptionIndex].votes = +1;
      } else {
        poolOptionWithVotes.push({
          anilistId: poolVote.anilistId,
          type: poolVote.type,
          votes: 1,
        });
      }
    }
  }

  return poolOptionWithVotes;
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
  getPoolResults,
  getUserVotesOnPool,
  create,
};

export default poolVoteService;
