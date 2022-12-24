import axiosClient from '@libs/axios';

const get = async (id: string) => {
  const response = await axiosClient.get<PollWithCreator>(`/poll/get/${id}`);
  const poll = response.data;
  return poll;
};

const listByUserId = async (userId: string) => {
  const response = await axiosClient.get<Poll[]>(
    `/poll/list-by-user-id/${userId}`
  );
  const poll = response.data;
  return poll;
};

const create = async (poll: Poll) => {
  const response = await axiosClient.post<string>('/poll/create', poll);
  const pollId = response.data;
  return pollId;
};

const vote = async (pollId: string, pollVotes: Array<PollOption>) => {
  await axiosClient.post(`/poll/vote/`, {
    pollId,
    pollVotes,
  });
};

const getUserVotes = async (pollId: string) => {
  const response = await axiosClient.get<Array<PollOption>>(
    `/poll/user/votes/${pollId}`
  );
  const userVotes = response.data;
  return userVotes;
};

const getResult = async (pollId: string) => {
  const response = await axiosClient.get<Array<PollResult>>(
    `/poll/result/${pollId}`
  );
  const pollResult = response.data;
  return pollResult;
};

const pollService = {
  get,
  listByUserId,
  getUserVotes,
  getResult,
  create,
  vote,
};

export default pollService;
