import poolVotesRepository from '@backend/repository/poolVoteRepository';

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
  create,
};

export default poolVoteService;
