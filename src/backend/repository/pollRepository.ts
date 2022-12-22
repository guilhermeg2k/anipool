import dynamoDb from '@backend/database';
import { v4 as uuidv4 } from 'uuid';

const POLL_TABLE_NAME = 'polls';

const get = async (id: string) => {
  const { Item: poll } = await dynamoDb
    .get({
      TableName: POLL_TABLE_NAME,
      Key: { id },
    })
    .promise();

  return poll as Poll;
};

const listByUserId = async (userId: string) => {
  const params = {
    FilterExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    },
    TableName: POLL_TABLE_NAME,
    Limit: 20,
  };

  const scanResult = await dynamoDb.scan(params).promise();
  return scanResult.Items as Array<Poll>;
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
  listByUserId,
};

export default pollRepository;
