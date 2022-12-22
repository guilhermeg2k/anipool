import dynamoDb from '@backend/database';
import { v4 as uuidv4 } from 'uuid';

const TABLE_NAME = 'poll_votes';

const create = async (votes: Array<PollVote>) => {
  const pollVotes = Array<{
    PutRequest: {
      Item: PollVote;
    };
  }>();

  votes.forEach((vote) => {
    const id = uuidv4();
    pollVotes.push({
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
      poll_votes: pollVotes,
    },
  };

  await dynamoDb.batchWrite(params).promise();
};

const getByUserIdAndPollId = async (userId: string, pollId: string) => {
  const params = {
    FilterExpression: 'pollId = :pollId and userId = :userId',
    ExpressionAttributeValues: {
      ':pollId': pollId,
      ':userId': userId,
    },
    TableName: TABLE_NAME,
  };

  const scanResult = await dynamoDb.scan(params).promise();

  if (scanResult.Items!.length > 0) {
    const votes = scanResult.Items! as Array<PollVote>;
    return votes;
  }

  return null;
};

const getByPollId = async (pollId: string) => {
  const params = {
    FilterExpression: 'pollId = :pollId',
    ExpressionAttributeValues: {
      ':pollId': pollId,
    },
    TableName: TABLE_NAME,
  };

  const scanResult = await dynamoDb.scan(params).promise();

  if (scanResult.Items!.length > 0) {
    const votes = scanResult.Items! as Array<PollVote>;
    return votes;
  }

  return null;
};

const pollVotesRepository = {
  getByPollId,
  getByUserIdAndPollId,
  create,
};

export default pollVotesRepository;
