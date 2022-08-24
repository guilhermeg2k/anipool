import poolRepository from '@backend/repository/poolRepository';

const get = async (id: string) => {
  const pool = await poolRepository.get(id);
  return pool;
};

const createAndReturnId = async (pool: Pool) => {
  const id = await poolRepository.createAndReturnId(pool);
  return id;
};

const poolService = {
  get,
  createAndReturnId,
};

export default poolService;
