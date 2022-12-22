import dynamoDb from '@backend/database';
import { v4 as uuidv4 } from 'uuid';

const POLL_TABLE_NAME = 'polls';

const get = async (id: string) => {
  const { Item: user } = await dynamoDb
    .get({
      TableName: POLL_TABLE_NAME,
      Key: { id },
    })
    .promise();

  return user as Poll;
};

const createAndReturnId = async (poll: Poll) => {
  const id = uuidv4();

  const params = {
    TableName: POLL_TABLE_NAME,
    Item: {
      id,
      ...poll,
    },
  };

  await dynamoDb.put(params).promise();

  return id;
};

const pollRepository = {
  get,
  createAndReturnId,
};

export default pollRepository;
