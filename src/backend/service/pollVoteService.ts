import pollVotesRepository from '@backend/repository/pollVoteRepository';

const getPollVotes = async (pollId: string) => {
  const pollVotes = await pollVotesRepository.getByPollId(pollId);
  return pollVotes;
};

const getUserVotesOnPoll = async (userId: string, pollId: string) => {
  const userVotes = await pollVotesRepository.getByUserIdAndPollId(
    userId,
    pollId
  );

  return userVotes;
};

const create = async (
  userId: string,
  pollId: string,
  pollVotes: Array<PollOption>
) => {
  const parsedPollVotes = Array<PollVote>();

  pollVotes.forEach((pollVote: PollOption) => {
    parsedPollVotes.push({
      ...pollVote,
      pollId,
      userId,
    });
  });

  await pollVotesRepository.create(parsedPollVotes);
};

const pollVoteService = {
  getPollVotes,
  getUserVotesOnPoll,
  create,
};

export default pollVoteService;
