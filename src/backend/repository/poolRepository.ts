import dynamoDb from '@backend/database';
import { v4 as uuidv4 } from 'uuid';

const POOL_TABLE_NAME = 'pools';

const createAndReturnId = async (pool: Pool) => {
  const id = uuidv4();

  const params = {
    TableName: POOL_TABLE_NAME,
    Item: {
      id,
      ...pool,
    },
  };

  await dynamoDb.put(params).promise();

  return id;
};

const get = async (id: string) => {
  const { Item: user } = await dynamoDb
    .get({
      TableName: POOL_TABLE_NAME,
      Key: { id },
    })
    .promise();

  return user as Pool;
};

const poolRepository = {
  get,
  createAndReturnId,
};

export default poolRepository;
