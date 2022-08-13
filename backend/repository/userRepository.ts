import dynamoDb from '@backend/database';
import { DynamoDB } from 'aws-sdk';
import { User } from '@backend/types';
import { v4 as uuidv4 } from 'uuid';

const USERS_TABLE_NAME = 'users';

const get = async (id: string) => {
  const { Item: user } = await dynamoDb
    .get({
      TableName: USERS_TABLE_NAME,
      Key: { id },
    })
    .promise();

  return user as User;
};

const getByOauthProviderAndOauthId = async (
  oauthProvider: string,
  oauthId: string
) => {
  const params = {
    FilterExpression: 'oauthProvider = :oauthProvider and oauthId = :oauthId',
    ExpressionAttributeValues: {
      ':oauthProvider': oauthProvider,
      ':oauthId': oauthId,
    },
    ProjectionExpression: 'oauthProvider, oauthId, nickname, avatarUrl',
    TableName: USERS_TABLE_NAME,
  };

  const scanResult = await dynamoDb.scan(params).promise();

  if (scanResult.Items!.length > 0) {
    const user = scanResult.Items![0];
    return user as User;
  }

  return null;
};

const createAndReturnId = async (user: User) => {
  const id = uuidv4();

  const params = {
    TableName: USERS_TABLE_NAME,
    Item: {
      id,
      oauthProvider: user.oauthProvider,
      oauthId: user.oauthId,
      nickname: user.nickname,
      avatarUrl: user.avatarUrl,
    },
  };

  await dynamoDb.put(params).promise();

  return id;
};

const userRepository = {
  get,
  getByOauthProviderAndOauthId,
  createAndReturnId,
};

export default userRepository;
