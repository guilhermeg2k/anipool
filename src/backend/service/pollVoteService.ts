import pollVotesRepository from '@backend/repository/pollVoteRepository';

const getpollVotes = async (pollId: string) => {
  const pollVotes = await pollVotesRepository.getBypollId(pollId);
  return pollVotes;
};

const getUserVotesOnpoll = async (userId: string, pollId: string) => {
  const userVotes = await pollVotesRepository.getByUserIdAndpollId(
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
  const parsedpollVotes = Array<PollVote>();

  pollVotes.forEach((pollVote: PollOption) => {
    parsedpollVotes.push({
      ...pollVote,
      pollId,
      userId,
    });
  });

  await pollVotesRepository.create(parsedpollVotes);
};

const pollVoteService = {
  getpollResults: getpollVotes,
  getUserVotesOnpoll,
  create,
};

export default pollVoteService;
