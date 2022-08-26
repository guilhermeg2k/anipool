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

const getUserVotes = async (poolId: string) => {
  const response = await axiosClient.get<Array<PoolOption>>(
    `/pool/user/votes/${poolId}`
  );
  const userVotes = response.data;
  return userVotes;
};

const getResult = async (poolId: string) => {
  const response = await axiosClient.get<Array<PoolOptionResult>>(
    `/pool/result/${poolId}`
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
