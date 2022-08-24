import poolRepository from '@backend/repository/poolRepository';

const createAndReturnId = async (pool: Pool) => {
  const id = await poolRepository.createAndReturnId(pool);
  return id;
};

const poolService = {
  createAndReturnId,
};

export default poolService;
