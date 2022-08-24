import axiosClient from '@libs/axios';

const get = async (id: string) => {
  const response = await axiosClient.get<Pool>(`/pool/${id}`);
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
  const respoonse = await axiosClient.get<Array<PoolOption>>(
    `/pool/user/votes/${poolId}`
  );
  const userVotes = respoonse.data;
  return userVotes;
};

const poolService = {
  get,
  getUserVotesOnPool,
  create,
  vote,
};

export default poolService;
