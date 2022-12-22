import axiosClient from '@libs/axios';

const get = async (id: string) => {
  const response = await axiosClient.get<PollWithCreator>(`/poll/get/${id}`);
  const pool = response.data;
  return pool;
};

const create = async (pool: Poll) => {
  const response = await axiosClient.post<string>('/poll/create', pool);
  const poolId = response.data;
  return poolId;
};

const vote = async (poolId: string, poolVotes: Array<PollOption>) => {
  await axiosClient.post(`/poll/vote/${poolId}`, {
    poolVotes,
  });
};

const getUserVotes = async (poolId: string) => {
  const response = await axiosClient.get<Array<PollOption>>(
    `/poll/user/votes/${poolId}`
  );
  const userVotes = response.data;
  return userVotes;
};

const getResult = async (poolId: string) => {
  const response = await axiosClient.get<Array<PollResult>>(
    `/poll/result/${poolId}`
  );
  const poolResult = response.data;
  return poolResult;
};

const poolService = {
  get,
  getUserVotes,
  getResult,
  create,
  vote,
};

export default poolService;
