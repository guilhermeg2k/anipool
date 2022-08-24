import axiosClient from '@libs/axios';

const create = async (pool: Pool) => {
  const response = await axiosClient.post('/pool/create', pool);
  const poolId = <string>response.data;
  return poolId;
};

const poolService = {
  create,
};

export default poolService;
