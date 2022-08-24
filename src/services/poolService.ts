import axiosClient from '@libs/axios';
import anilistService from './anilistService';
interface PoolVote {
  title: string;
  endDate: string;
  multiOptions: boolean;
  options: Array<Anilist.Media | Anilist.Character>;
}

const get = async (id: string) => {
  const response = await axiosClient.get<Pool>(`/pool/${id}`);
  const pool = response.data;
  return pool;
};

const create = async (pool: Pool) => {
  const response = await axiosClient.post('/pool/create', pool);
  const poolId = <string>response.data;
  return poolId;
};

const poolService = {
  get,
  create,
};

export default poolService;
