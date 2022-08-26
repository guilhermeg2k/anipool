import axiosClient from '@libs/axios';

const get = async (id: string) => {
  const response = await axiosClient.get<Pool>(`/pool/get/${id}`);
  const pool = response.data;
  return pool;
};

const create = async (pool: Pool) => {
  const response = await axiosClient.post<string>('/pool/create', pool);
  const poolId = response.data;
  return poolId;
};

const vote = async (poolId: string, poolVotes: Array<PoolOption>) => {
  await axiosClient.post(`/pool/vote/${poolId}`, {
    poolVotes,
  });
};

const getUserVotesOnPool = async (poolId: string) => {
  const response = await axiosClient.get<Array<PoolOption>>(
    `/pool/user/votes/${poolId}`
  );
  const userVotes = response.data;
  return userVotes;
};

const getPoolResults = async (poolId: string) => {
  const response = await axiosClient.get<Array<PoolOptionWithVotes>>(
    `/pool/results/${poolId}`
  );
  const poolResults = response.data;
  return poolResults;
};

const poolService = {
  get,
  getUserVotesOnPool,
  getPoolResults,
  create,
  vote,
};

export default poolService;
