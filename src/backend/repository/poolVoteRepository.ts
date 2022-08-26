import dynamoDb from '@backend/database';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = 'pool_votes';

const create = async (votes: Array<PoolVote>) => {
  const poolVotes = Array<{
    PutRequest: {
      Item: PoolVote;
    };
  }>();

  votes.forEach((vote) => {
    const id = uuidv4();
    poolVotes.push({
      PutRequest: {
        Item: {
          ...vote,
          id,
        },
      },
    });
  });

  let params = {
    RequestItems: {
      pool_votes: poolVotes,
    },
  };

  await dynamoDb.batchWrite(params).promise();
};

const getByUserIdAndPoolId = async (userId: string, poolId: string) => {
  const params = {
    FilterExpression: 'poolId = :poolId and userId = :userId',
    ExpressionAttributeValues: {
      ':poolId': poolId,
      ':userId': userId,
    },
    TableName: TABLE_NAME,
  };

  const scanResult = await dynamoDb.scan(params).promise();

  if (scanResult.Items!.length > 0) {
    const votes = scanResult.Items! as Array<PoolVote>;
    return votes;
  }

  return null;
};

const getByPoolId = async (poolId: string) => {
  const params = {
    FilterExpression: 'poolId = :poolId',
    ExpressionAttributeValues: {
      ':poolId': poolId,
    },
    TableName: TABLE_NAME,
  };

  const scanResult = await dynamoDb.scan(params).promise();

  if (scanResult.Items!.length > 0) {
    const votes = scanResult.Items! as Array<PoolVote>;
    return votes;
  }

  return null;
};

const poolVotesRepository = {
  getByPoolId,
  getByUserIdAndPoolId,
  create,
};

export default poolVotesRepository;
